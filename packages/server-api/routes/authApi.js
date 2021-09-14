const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

// create registerApi(check if email is already used)
router.post("/register", authController.register);

// login with jwt
router.post("/login", authController.login);

// logout router
router.get(
  "/logout",
  passport.authenticate("bearer", { session: false }),
  authController.logout
);

module.exports = router;
