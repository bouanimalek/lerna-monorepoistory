const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const passport = require("passport");

// create reservation
router.post(
  "/reservation/:idEvent",
  passport.authenticate("bearer", { session: false }),
  reservationController.createReservation
);

module.exports = router;
