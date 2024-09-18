const express = require("express");
const router = express.Router();
const multer = require("multer");
const Minio = require("minio");
const uuid = require("uuid");
const logger = require("../utilities/logger");

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const upload = multer();

const { PrismaClient } = require("@prisma/client");
const { publishToPool } = require("../utils/rabbitMQ");

const prisma = new PrismaClient();

router.post("/create", upload.single("file"), async (req, res) => {
  try {
    // get user from session
    const user = req.session.user;

    const file = req.file;
    const file_name = file.originalname;

    logger.debug(`Received file: ${file_name}`);
    logger.debug(`Received JSON data: ${req.body.jsonData}`);

    // For Test
    logger.info("File Received and Json Data");
    const jsonData = JSON.parse(req.body.jsonData);
    // For Test
    logger.info("Start Generating Unique File");

    const generateUniqueFileName = async () => {
      // generate 12 character random string
      const randomString = uuid.v4().replace(/-/g, "").substring(0, 12);

      let isFileNameExists = !!(await prisma.turnitin.findFirst({
        where: {
          minioId: randomString,
        },
      }));
      if (isFileNameExists) {
        return generateUniqueFileName();
      }

      return randomString;
    };
    // For Test
    logger.info("Completed Generating Unique File");
    logger.info(`File Name: ${generateUniqueFileName}`);
    // For Test
    logger.info("Start Uploading to Minio server");
    // upload file to minio storage
    const metaData = {};
    const uniqueString = await generateUniqueFileName();
    // generate random alpha numeric string for unique file name and add file extension
    const unique_file_id =
      uniqueString + file_name.substring(file_name.lastIndexOf("."));
    //For test
    logger.info(`File Name: ${unique_file_id}`);

    const bucketName = process.env.MINIO_BUCKET_NAME;
    logger.info(`Bucket Name from .env: ${bucketName}`); // Debug log

    if (!bucketName) {
      logger.error("Bucket name is not defined in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }
    // get bucket name from .env file
    //const bucketName = process.env.MINIO_BUCKET_NAME;
    // Log the bucket name to verify
    logger.info(`Bucket Name: ${bucketName}`);

    minioClient.putObject(
      bucketName,
      unique_file_id,
      file.buffer,
      async function (err, etag) {
        if (err) {
          logger.error(`Error uploading file to MinIO: ${err}`);
          res.status(500).json({
            error:
              "Error uploading file," + "try again later or contact support",
          });
        } else {
          logger.debug(`File uploaded successfully to MinIO`);
          await prisma.submissions.create({
            data: {
              userId: user.id,
              turnitin: {
                create: {
                  minioId: unique_file_id,
                  processSettings: jsonData,
                },
              },
            },
          });

          try {
            // submit task to RabbitMQ
            await publishToPool(unique_file_id);
            res.json({ msg: "File submitted successfully" });
          } catch (error) {
            logger.error(`Error submitting task to RabbitMQ: ${error}`);
            res.status(500).json({
              error:
                "Error submitting task, try again later or contact support",
            });
          }
        }
      }
    );
  } catch (error) {
    logger.error(`Error: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const user = req.session.user;
    const submissionId = parseInt(req.params.id, 10);

    if (!submissionId) {
      return res.status(400).json({ error: "Invalid submission ID" });
    }

    const submission = await prisma.submissions.findFirst({
      where: {
        id: submissionId,
        userId: user.id,
      },
    });

    if (!submission) {
      return res.status(403).json({ error: "Submission not found" });
    }

    await prisma.submissions.delete({
      where: {
        id: submissionId,
      },
    });

    res.json({ msg: "Submission deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/list", async (req, res) => {
  try {
    const user = req.session.user;

    // Input validation and defaults
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    // Validate for positive values
    if (page < 1 || pageSize < 1) {
      return res
        .status(400)
        .json({ error: "Page and pageSize must be positive integers" });
    }

    const totalSubmissions = await prisma.submissions.count({
      where: {
        userId: user.id,
        turnitin: {
          isNot: null,
        },
      },
    });

    const submissions = await prisma.submissions.findMany({
      where: {
        userId: user.id,
        turnitin: {
          isNot: null,
        },
      },
      include: {
        turnitin: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      total: totalSubmissions,
      page: page,
      pageSize: submissions.length,
      data: submissions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
