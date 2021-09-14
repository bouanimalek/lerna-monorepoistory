const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../utils/uploadFile");
const passport = require("passport");

// get all users
router.get(
  "/users",
  passport.authenticate("bearer", { session: false }),
  userController.getAllUsers
);

// get user by id
router.get(
  "/users/:id",
  passport.authenticate("bearer", { session: false }),
  userController.getUserById
);

// modify user
router.put(
  "/users/:id",
  [
    passport.authenticate("bearer", { session: false }),
    upload.single("images"),
  ],
  userController.modifyUser
);

// delete user
router.delete(
  "/users/:id",
  passport.authenticate("bearer", { session: false }),
  userController.deleteUser
);

// affect event to user
router.post(
  "/users/affectEventToUser/:idUser/:idEvent",
  passport.authenticate("bearer", { session: false }),
  userController.affectEventUser
);

// desAffect event from user
router.post(
  "/users/desAffectEvent/:idUser/:idEvent",
  passport.authenticate("bearer", { session: false }),
  userController.desAffectEventUser
);

// get user with all events
router.get(
  "/userWithEvents/:id",
  passport.authenticate("bearer", { session: false }),
  userController.getUserWithAllEvents
);

// get all users with all events
router.get(
  "/usersWithEvents",
  passport.authenticate("bearer", { session: false }),
  userController.getAllUsersWithAllEvents
);

module.exports = router;
