require("dotenv/config");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const winston = require("./middlewares/logger/winston");
const { 

  API_ENDPOINT_NOT_FOUND_ERR,
  SERVER_ERR,
} = require("./utils/error/errors");



app.use(cors({origin:"*",credentials:true}));

// view engine setup


app.use(
  helmet({
    contentSecurityPolicy: false,
    referrerPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(logger("dev"));
app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(cookieParser());
app.use(flash());

app.use(
  express.urlencoded({
    parameterLimit: 500000,
    limit: "50mb",
    extended: true,
  })
);


app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");

 app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

// error handler

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  let data = err.data || null;
  let authRequired = false;
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  if (message === "jwt expired") {
    authRequired = true;
  }
  res.status(message === "jwt expired" ? 200 : status).json({
    status: message === "jwt expired" ? 200 : status,
    success: false,
    message,
    data: data,
    authRequired,
  });
});

module.exports = app;
