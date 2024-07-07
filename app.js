require("./config/db");
require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.APP_PORT || 3001;
const app = express();
const rootRouter = require("./routes");
const fs = require("fs");
/********************Swagger Implementation Starts ******************/
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

/********************Swagger Implementation Ends ******************/

// Node cron import
const cron = require("node-cron");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Swagger route below
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", rootRouter);

// serve the API with signed certificate on 443 (SSL/HTTPS) port
// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync("/etc/letsencrypt/live/example.com/privkey.pem"),
//     cert: fs.readFileSync("/etc/letsencrypt/live/example.com/fullchain.pem"),
//   },
//   app
// );

// httpsServer.listen(port, () => {
//   console.log(`Backend app is listening on port ${port} for backend server`);
// });

app.listen(port, () => {
  console.log(`Backend app is listening on port ${port} for backend server`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Closing HTTP server.");
  httpsServer.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});
