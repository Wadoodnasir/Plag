const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

require("dotenv").config();

const app = express();

const limiter = rateLimit({
  headers: false,
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
});

app.use(cors());
app.use(limiter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 4000;

app.use(
  session({
    secret: "h292ej92eh2212jhhd099", // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
