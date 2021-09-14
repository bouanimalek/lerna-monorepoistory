const express = require("express");
const morgan = require("morgan");
//const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
// passeport bearer strategy implémentation
const bearerStrategy = require("./passport/bearerStrategy");
// connect to database
const connect = require("./database/connect");
// initialize script
const initScript = require("./database/initScript");
const app = express();
const port = 4000;
// config cors
app.use(cors());
// public route (to serve all static files: images, pdf, qrcode)
app.use("/public", express.static("public"));
// dot env config
dotenv.config();
// body parser config
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
// morgan
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({ message: "Welcome back!" });
});

// userApi
const userApi = require("./routes/userApi");

// eventApi
const eventApi = require("./routes/eventApi");

// ticketApi
const ticketApi = require("./routes/ticketApi");

// tagApi
const tagApi = require("./routes/tagApi");

// authApi(jwt, passport, passport-http-bearer)
const authApi = require("./routes/authApi");

// resetPassword Api
const resetPasswordApi = require("./routes/resetPasswordApi");

// reservationApi
const reservationApi = require("./routes/reservationApi");

// homeApi
const homeApi = require("./routes/homeApi");

// dashboardApi
const dashboardApi = require("./routes/dashboardApi");

app.use("", authApi);

app.use("", userApi);

app.use("", eventApi);

app.use("", ticketApi);

app.use("", tagApi);

app.use("", resetPasswordApi);

app.use("", reservationApi);

app.use("", homeApi);

app.use("", dashboardApi);

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});
