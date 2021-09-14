const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const passport = require("passport");

//get all events
router.get(
  "/dashboard",
  passport.authenticate("bearer", { session: false }),
  dashboardController.getAllStats
);

module.exports = router;
