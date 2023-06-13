const mongoose = require("mongoose");

mongoose
  .connect(process.env.BASE_URL)
  .then(() => {
    console.log("Mongoose connect successfuly");
  })
  .catch((error) => {
    console.log(error.message);
  });
