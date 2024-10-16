const express = require("express");
const multer = require("multer");
const puppeteer = require("puppeteer");
const router = express.Router();
const path = require("path");
const logger = require("../utilities/logger");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ensure "uploads/" directory exists
const uploadDir = path.resolve(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file upload storage and filtering
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(new Error("Please upload a PDF or DOC file"));
    }
    cb(null, true);
  },
});

// POST route to handle file uploads and processing
router.post("/upload/submit", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const loginUrl = "https://turnitin.report/accounts/login/";
  const targetUrl = "https://turnitin.report/turnitin/reports/";
  const baseUrl = "https://turnitin.report";

  try {
    // Create a new report in Prisma with initial status
    const newReport = await prisma.report.create({
      data: {
        fileName: req.file.originalname,
        status: "processing",
        createdAt: new Date(),
      },
    });

    const reportId = newReport.id; // Get the report ID

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const downloadPath = path.resolve(__dirname, "../downloads");
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    await page._client().send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadPath,
    });

    // Puppeteer interaction
    await page.goto(loginUrl);
    await page.type('input[name="email"]', "adeelgeneral@gmail.com");
    await page.type('input[name="password"]', "UBbN6w42wSCYYKD");
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await page.goto(targetUrl);

    await page.click('button[data-bs-target="#submitFileModal"]');
    await page.waitForSelector('input[type="file"][name="submitted-file"]');
    const inputFile = await page.$('input[type="file"][name="submitted-file"]');
    await inputFile.uploadFile(filePath);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.click('form#submit-file button[type="submit"]');

    let status = "processing";
    let responseData = null;

    while (status === "processing") {
      await page.waitForSelector(
        'table.table.table-nowrap.table-hover.mb-0 tbody tr:first-child td[open-report=""] span.badge'
      );

      status = await page.evaluate(() => {
        return document
          .querySelector(
            'table.table.table-nowrap.table-hover.mb-0 tbody tr:first-child td[open-report=""] span.badge'
          )
          .innerText.trim();
      });

      if (status !== "processing") {
        responseData = await page.evaluate(() => {
          const row = document.querySelector(
            "table.table.table-nowrap.table-hover.mb-0 tbody tr:first-child"
          );
          return {
            id: row.getAttribute("id"),
            fileName: row.getAttribute("submitted-file-name"),
            aiPercentage: row.getAttribute("ai-percent"),
            similarityPercentage: row.getAttribute("similarity-percent"),
            status: row.querySelector("td span.badge").innerText.trim(),
            submittedFileUrl: row.getAttribute("submitted-file-url"),
            plagReportUrl: row.getAttribute("plag-report-url"),
            aiReportUrl: row.getAttribute("ai-report-url"),
          };
        });

        // Update the report in Prisma with the fetched data
        await prisma.report.update({
          where: { id: reportId },
          data: {
            status: responseData.status,
            aiPercentage: responseData.aiPercentage,
            similarityPercentage: responseData.similarityPercentage,
            plagReportUrl: responseData.plagReportUrl,
            aiReportUrl: responseData.aiReportUrl,
          },
        });
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (responseData) {
      const plagReportUrl = baseUrl + responseData.plagReportUrl;
      const aiReportUrl = baseUrl + responseData.aiReportUrl;

      await downloadFile(
        page,
        plagReportUrl,
        `plag_report_${responseData.id}.pdf`,
        downloadPath
      );
      await downloadFile(
        page,
        aiReportUrl,
        `ai_report_${responseData.id}.pdf`,
        downloadPath
      );

      responseData.plagFilePath = path.join(
        downloadPath,
        `plag_report_${responseData.id}.pdf`
      );
      responseData.aiFilePath = path.join(
        downloadPath,
        `ai_report_${responseData.id}.pdf`
      );
    }

    await browser.close();
    res.json({ status: "completed", data: responseData });
  } catch (error) {
    logger.error("Error during file upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await prisma.report.findMany();
    res.json(reports);
  } catch (error) {
    logger.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE route to delete a report by ID
router.delete("/report/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const report = await prisma.report.findUnique({
      where: { id: parseInt(id) },
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    await prisma.report.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: `Report with ID ${id} deleted successfully` });
  } catch (error) {
    logger.error("Error deleting report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to download a file
const downloadFile = async (page, url, fileName, downloadPath) => {
  const fileDownloadUrl = `${url}`;
  console.log("Downloading file from:", fileDownloadUrl);

  const response = await page.goto(fileDownloadUrl);
  const buffer = await response.buffer();
  const filePath = path.join(downloadPath, fileName);
  fs.writeFileSync(filePath, buffer);
  console.log(`File downloaded and saved as: ${filePath}`);
};

module.exports = router;
