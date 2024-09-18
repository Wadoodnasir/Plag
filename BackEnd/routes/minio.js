const express = require("express");
const router = express.Router();
const Minio = require("minio");
const logger = require("../utilities/logger");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

router.get("/getLink", async (req, res) => {
  const filename = req.query.filename;
  // check is file belongs to user
  const user = req.session.user;

  const submission = await prisma.submissions.findFirst({
    where: {
      OR: [
        {
          turnitin: {
            minioId: filename,
          },
        },
        {
          turnitin: {
            plagiarismReportMinio: filename,
          },
        },
        {
          turnitin: {
            aiPlagReportMinio: filename,
          },
        },
      ],
      userId: user.id,
    },
  });

  if (!submission) {
    res.status(403).json({ error: "File not found" });
    return;
  }

  const url = await minioClient.presignedGetObject(
    process.env.MINIO_BUCKET_NAME,
    filename,
    24 * 60 * 60
  );
  res.json({ url });
});

module.exports = router;
