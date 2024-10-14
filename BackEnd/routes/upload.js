const express = require("express");
const multer = require("multer");
const puppeteer = require("puppeteer");
const router = express.Router();
const path = require("path");
const logger = require("../utilities/logger");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}-${file.originalname}`;
        console.log(uniqueFilename)
        cb(null, uniqueFilename); // Ensure unique filenames with timestamp
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
            return cb(new Error('Please upload a PDF or DOC file'));
        }
        cb(null, true);
    }
}); // Use the custom storage engine

router.post("/upload/submit", upload.single("file"), async (req, res) => {
    const filePath = req.file.path; // Path to the uploaded file
    const loginUrl = "https://turnitin.report/accounts/login/";
    const targetUrl = "https://turnitin.report/turnitin/reports/";
    const baseUrl = "https://turnitin.report";

    try {

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath); // Ensure the directory exists
        }

        await page._client().send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath
        });


        // Login to the Turnitin account
        await page.goto(loginUrl);
        await page.type('input[name="email"]', 'adeelgeneral@gmail.com');
        await page.type('input[name="password"]', 'UBbN6w42wSCYYKD');
        await page.click('button[type="submit"]');

        // Wait for navigation after login
        await page.waitForNavigation();

        // Navigate to the upload page
        await page.goto(targetUrl);

        // Upload the file
        await page.click('button[data-bs-target="#submitFileModal"]'); // Click the button to open the modal
        await page.waitForSelector('input[type="file"][name="submitted-file"]'); // Wait for the file input to be available
        const inputFile = await page.$('input[type="file"][name="submitted-file"]');
        await inputFile.uploadFile(filePath);

        // Submit the form
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
        await page.click('form#submit-file button[type="submit"]');

        // Poll for status
        let status = "processing";
        let responseData = null;

        while (status === "processing") {
            await page.waitForSelector('table.table.table-nowrap.table-hover.mb-0 tbody tr:first-child td[open-report=""] span.badge');

            status = await page.evaluate(() => {
                return document.querySelector('table.table.table-nowrap.table-hover.mb-0 tbody tr:first-child td[open-report=""] span.badge').innerText.trim();
            });

            console.log('status:', status);
            if (status !== "processing") {
                responseData = await page.evaluate(() => {
                    const row = document.querySelector('table.table.table-nowrap.table-hover.mb-0 tbody tr:first-child');
                    const reportData = {
                        id: row.getAttribute('id'),
                        fileName: row.getAttribute('submitted-file-name'),
                        aiPercentage: row.getAttribute('ai-percent'),
                        similarityPercentage: row.getAttribute('similarity-percent'),
                        status: row.querySelector('td span.badge').innerText.trim(),
                        date: row.querySelectorAll('td')[6].innerText.trim(),
                        submittedFileUrl: row.getAttribute('submitted-file-url'),
                        plagReportUrl: row.getAttribute('plag-report-url'),
                        aiReportUrl: row.getAttribute('ai-report-url')
                    };
                    return reportData;
                });
                break; // Exit the loop when status changes from processing
            }





            // Wait before checking the status again
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        if (responseData) {
            // Construct the full URLs
            const plagReportUrl = baseUrl + responseData.plagReportUrl;
            const aiReportUrl = baseUrl + responseData.aiReportUrl;


            await downloadFile(page, plagReportUrl, `plag_report_${responseData.id}.pdf`, downloadPath);
            await downloadFile(page, aiReportUrl, `ai_report_${responseData.id}.pdf`, downloadPath);

            // Attach downloaded file paths to the response
            responseData.plagFilePath = path.join(downloadPath, `plag_report_${responseData.id}.pdf`);
            responseData.aiFilePath = path.join(downloadPath, `ai_report_${responseData.id}.pdf`);
        }


        await browser.close();

        // Return the response to the API caller
        res.json({ status: "completed", data: responseData });
    } catch (error) {
        logger.error("Error during file upload:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



const downloadFile = async (page, url, fileName, downloadPath) => {
    const fileDownloadUrl = `${url}`;
    console.log('Downloading file from:', fileDownloadUrl);

    const response = await page.goto(fileDownloadUrl);

    // Read the file as a buffer
    const buffer = await response.buffer();

    // Write the buffer to a file
    const filePath = path.join(downloadPath, fileName);
    fs.writeFileSync(filePath, buffer);

    console.log(`File downloaded and saved as: ${filePath}`);
};






const doLogin = async () => {
    logger.info("Logging in to Turnitin");
    logger.info("Using Turnitin API to get session id and legacy session id");

    let { loginId, loginToken } = await getLoginTokenAndId();

    logger.debug("Login ID" + loginId);
    logger.debug("Login Token" + loginToken);

    let response = await fetch(
        "https://www.turnitin.com/login_page.asp?lang=en_us",
        {
            headers: {
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded",
                Referer: "https://www.turnitin.com/login_page.asp?lang=en_us",
            },
            body: qs.stringify({
                javascript_enabled: 0,
                email: "samirmaster8916722@outlook.com",
                user_password: "kz+f(#j(Dv$2Q3+",
                submit: "Log in",
                browser_fp: "8ef1ec524e1d504e58409b87087c95b8",
                login_id: loginId,
                login_token: loginToken,
            }),
            method: "POST",
        }
    );

    const setCookieHeader = response.headers.get("set-cookie");

    logger.debug("Response from login :" + response.status);
    logger.debug("Response from setCookieHeader :" + setCookieHeader);

    // Parse cookies
    let cookies = setCookieHeader
        .split(",")
        .map((cookie) => cookie.split(";")[0]);
    // trim leading whitespace
    cookies = cookies.map((cookie) => cookie.trim());
    const legacySessionIdString = cookies.find((cookie) =>
        cookie.includes("legacy-session-id=")
    );
    const sessionIdString = cookies.find((cookie) =>
        cookie.includes("session-id=")
    );
    const legacySessionId = legacySessionIdString.split("=")[1];
    const sessionId = sessionIdString.split("=")[1];

    logger.debug("Session ID : " + sessionId);
    logger.debug("Legacy Session ID : " + legacySessionId);

    axiosInstance.defaults.headers.Cookie = `session-id=${sessionId}; legacy-session-id=${legacySessionId};`; // set cookie in axios instance

    logger.info("Logged in successfully - USING TURNITIN API");

    return {
        sessionId,
        legacySessionId,
    };
};

module.exports = router;