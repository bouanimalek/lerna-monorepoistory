const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");
const passport = require("passport");

// get all tags
router.get(
  "/tags",
  passport.authenticate("bearer", { session: false }),
  tagController.getAlltags
);

// get tag by id
router.get(
  "/tags/:id",
  passport.authenticate("bearer", { session: false }),
  tagController.getTagById
);

// create tag
router.post(
  "/tags",
  passport.authenticate("bearer", { session: false }),
  tagController.createTag
);

// modify tag
router.put(
  "/tags/:id",
  passport.authenticate("bearer", { session: false }),
  tagController.modifyTag
);

// delete tag
router.delete(
  "/tags/:id",
  passport.authenticate("bearer", { session: false }),
  tagController.deleteTag
);

module.exports = router;
