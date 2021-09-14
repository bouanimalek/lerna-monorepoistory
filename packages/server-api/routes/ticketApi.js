const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const passport = require("passport");

// get all tickets
router.get(
  "/tickets",
  passport.authenticate("bearer", { session: false }),
  ticketController.getAllTcikets
);

// delete
router.delete(
  "/tickets/:id",
  passport.authenticate("bearer", { session: false }),
  ticketController.deleteTicket
);

module.exports = router;
