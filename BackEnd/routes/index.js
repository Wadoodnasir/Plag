const express = require("express");
const router = express.Router();
const logger = require("../utilities/logger");
const _ = require("lodash");

const socket = require("../utilities/socket");
const { PrismaClient } = require("@prisma/client");
const {
  getUserAndSubmissionIdByMinioId,
  prismaUpdateSubmissionStatus,
} = require("../utilities/utils");

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const prisma = new PrismaClient();

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.post("/test", async (req, res) => {
  logger.debug("request data:" + JSON.stringify(req.body));

  // Flatten request data
  let jsonData = _.merge(req.body, _.get(req.body, "data", {}));
  logger.debug("flattened data:" + JSON.stringify(jsonData));

  try {
    // Validate required fields
    if (!jsonData.json_data || !jsonData.json_data.upload_file_id) {
      return res
        .status(400)
        .json({ error: "Invalid data, missing upload_file_id" });
    }

    logger.debug("@@upload_file_id:" + jsonData.json_data.upload_file_id);

    const userSubmission = await prisma.turnitin.findFirst({
      where: { minioId: jsonData.json_data.upload_file_id },
    });

    if (!userSubmission) {
      logger.warn(
        `No submission found for minioId: ${jsonData.json_data.upload_file_id}`
      );
      return res.status(404).json({ error: "Submission not found" });
    }

    const keyMapping = {
      submissionId: "turnitinSubmissionId",
      submissionWordCount: "wordCount",
      plagiarismValue: "similarity",
      submissionPageCount: "pageCount",
      isPlagiarismReportAvailable: "isPlagiarismReportAvailable",
      plagiarismReportMinioUniqueFileId: "plagiarismReportMinio",
      isAiReportAvailable: "isAiReportAvailable",
      aiReportMinioUniqueFileId: "aiPlagReportMinio",
      aiReportStatus: "aiReportStatus",
      isAiReportError: "isAiReportError",
      aiReportErrorCode: "aiReportErrorCode",
      aiReportErrorMessage: "aiReportErrorMessage",
    };

    const updates = _.pick(jsonData, Object.keys(keyMapping));
    const filteredUpdates = _.pickBy(updates, _.identity);
    let mappedUpdates = _.mapKeys(
      filteredUpdates,
      (value, key) => keyMapping[key]
    );

    if ("similarity" in mappedUpdates) {
      mappedUpdates.similarity = mappedUpdates.similarity.toString();
    }

    // Update database if necessary
    if (!_.isEmpty(mappedUpdates)) {
      await prisma.turnitin.update({
        where: { id: userSubmission.id },
        data: mappedUpdates,
      });
    }

    const io = socket.getIO();
    const { userId, submissionId } = await getUserAndSubmissionIdByMinioId(
      jsonData.json_data.upload_file_id
    );

    if (userId && submissionId) {
      mappedUpdates.submissionId = submissionId;
      if (jsonData.status) {
        await prismaUpdateSubmissionStatus(submissionId, jsonData.status);
      }
      io.to(userId).emit("submissionUpdate", JSON.stringify(mappedUpdates));
    }
  } catch (error) {
    logger.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  res.json({ msg: "success" });
});

module.exports = router;
