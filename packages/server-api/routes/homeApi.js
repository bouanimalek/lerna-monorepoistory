const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const upload = require("../utils/uploadFile");
const passport = require("passport");

//get all events
router.get(
  "/home/events",
  passport.authenticate("bearer", { session: false }),
  homeController.getAllEvents
);

//modify event
router.put(
  "/home/events/:id",
  [
    passport.authenticate("bearer", { session: false }),
    upload.single("images"),
  ],
  homeController.modifyEvent
);

module.exports = router;
