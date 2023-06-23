const express = require("express");
const app = express();
app.use("/", express.static("./uploads"));
const cloudinary = require("cloudinary");

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
// ======== cloudinary
cloudinary.config({
  cloud_name: "dvgvcifrd",
  api_key: "651412252829259",
  api_secret: "RC4IM6i6t_oginPt9h1os5C5BBw",
});

// -------------------- Router
app.use("/user", require("./router/UserRouter"));
app.use("/shop", require("./router/ShopRouter"));
app.use("/product", require("./router/ProductRouter"));
app.use("/event", require("./router/EventRouter"));

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
