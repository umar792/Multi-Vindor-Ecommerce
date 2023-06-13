const express = require("express");
const app = express();
app.use("/", express.static("./uploads"));

// ---------------- dotenv
require("dotenv").config();

// ----------------cookie-parser
var cookieParser = require("cookie-parser");
app.use(cookieParser());

// ----------------- mongoose connection
require("./DB/conn");

// --------------- cors
const cors = require("cors");
app.use(cors());

// body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// -------------------- Router
app.use("/user", require("./router/UserRouter"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Express Server runing on port ${process.env.PORT}`);
});

// ------------- uncaughtException Error Handle
process.on("uncaughtException", (err) => {
  console.log(`uncaughtException ${err.message} Handle`);
  console.log("server shutting down");
  server.close(() => {
    process.exit(1);
  });
});

// ------------------------- unhandledRejection
process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection Error Handle ${error.message}`);
  console.log("server shutting down");
  server.close(() => {
    process.exit(1);
  });
});
