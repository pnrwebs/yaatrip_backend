const mongoose = require("mongoose");

require("dotenv").config();

console.log("******************** Connecting to Database ********************");
mongoose.set("strictQuery", false);

/**
 * @description  Mongoose connection For Local Database
 */
if (process.env.ENVR == "LOCAL") {
  mongoose
    .connect(process.env.DB_LOCAL)
    .then((success) => {
      console.log(
        "****************** Connection Success **********************"
      );
    })
    .catch((error) => {
      console.log(
        "***************** Connection Failed ******************",
        error
      );
    });
}

/**
 * @description  Mongoose connection For Development Database
 */
if (process.env.ENVR == "DEV") {
  mongoose
    .connect(process.env.DB_DEV)
    .then((success) => {
      console.log(
        "****************** Connection Success **********************"
      );
    })
    .catch((error) => {
      console.log(
        "***************** Connection Failed ******************",
        error
      );
    });
}

/**
 * @description  Mongoose connection For Production Database
 */
if (process.env.ENVR == "PROD") {
  mongoose
    .connect(process.env.DB_PROD)
    .then((success) => {
      console.log(
        "****************** Connection Success **********************"
      );
    })
    .catch((error) => {
      console.log(
        "***************** Connection Failed ******************",
        error
      );
    });
}
