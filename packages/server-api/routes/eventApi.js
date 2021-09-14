const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require("../utils/uploadFile");
const passport = require("passport");

// get all events
router.get(
  "/events",
  passport.authenticate("bearer", { session: false }),
  eventController.getAllEvents
);

// create event
router.post(
  "/events",
  [
    passport.authenticate("bearer", { session: false }),
    upload.single("images"),
  ],
  eventController.createEvent
);

// get event by id
router.get(
  "/events/:id",
  passport.authenticate("bearer", { session: false }),
  eventController.getEventById
);

// modify event
router.put(
  "/events/:id",
  [
    passport.authenticate("bearer", { session: false }),
    upload.single("images"),
  ],
  eventController.modifyEvent
);

// delete event
router.delete(
  "/events/:id",
  passport.authenticate("bearer", { session: false }),
  eventController.deleteEvent
);

// affect author to event
router.post(
  "/events/affectAuthorToEvent/:idEvent/:idUser",
  passport.authenticate("bearer", { session: false }),
  eventController.affectAuthorToEvent
);

// desAffect author from event
router.post(
  "/events/desAffectAuthor/:idEvent",
  passport.authenticate("bearer", { session: false }),
  eventController.desAffectAuthorEvent
);

// affect tag to event
router.post(
  "/events/affectTagToEvent/:idEvent/:idTag",
  passport.authenticate("bearer", { session: false }),
  eventController.affectTagEvent
);

// desAffect tag from event
router.post(
  "/events/desAffectTag/:idEvent/:idTag",
  passport.authenticate("bearer", { session: false }),
  eventController.desAffectTagEvent
);

// get event with author
router.get(
  "/events/getEventWithAuthor/:id",
  passport.authenticate("bearer", { session: false }),
  eventController.getEventWithAuthor
);

// get all events with authors
router.get(
  "/events/getAllEventsWithAuthor",
  passport.authenticate("bearer", { session: false }),
  eventController.getAllEventsWithAllAuthor
);

// get event with tags
router.get(
  "/events/getEventWithTags/:id",
  passport.authenticate("bearer", { session: false }),
  eventController.getEventWithTags
);

// get all events with all tags
router.get(
  "/events/getAllEventsWithTags",
  passport.authenticate("bearer", { session: false }),
  eventController.getAllEventsWithAllTags
);

module.exports = router;
