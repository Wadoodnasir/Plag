const session = require("express-session");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function checkUserSession(req, res, next) {
  if (req.session.user) {
    next(); // If session exists, proceed to page
  } else {
    res.status(401).send("Unauthorized"); // If session doesn't exist, return unauthorized
  }
}

let sessionMiddleware = session({
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true for HTTPS environments
});

async function getUserAndSubmissionIdByMinioId(minioId) {
  const turnitinRecord = await prisma.turnitin.findFirst({
    where: {
      minioId: minioId,
    },
    include: {
      submission: {
        select: {
          userId: true,
          id: true,
        },
      },
    },
  });

  return {
    userId: turnitinRecord?.submission?.userId,
    submissionId: turnitinRecord?.submission?.id,
  };
}

async function prismaUpdateSubmissionStatus(submissionId, newStatus) {
  return prisma.submissions.update({
    where: {
      id: submissionId,
    },
    data: {
      status: newStatus,
    },
  });
}

module.exports = {
  checkUserSession,
  sessionMiddleware,
  prismaUpdateSubmissionStatus,
  getUserAndSubmissionIdByMinioId,
};
