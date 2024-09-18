const { format, transports } = require("winston");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file"); // Import for log rotation

// Configuration for environments
const config = {
  development: {
    level: "debug",
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console(), // Log to console in development
    ],
  },
  production: {
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new DailyRotateFile({
        filename: "app-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        maxFiles: "14d", // Keep logs for 14 days
      }),
      // Add transports for remote logging services if needed (e.g., Loggly, Datadog)
    ],
  },
};

// Create the logger instance
const logger = winston.createLogger(
  config[process.env.NODE_ENV || "development"]
);

module.exports = logger;
