const Event = require("../models/eventSchema");

// get all events
exports.getAllEvents = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const events = await Event.find({});
      res.json(events);
    } else {
      let ownerEvents = await Event.find({ author: req.user._id });
      if (!ownerEvents) {
        ownerEvents = [];
      }
      res.json(ownerEvents);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// create event
exports.createEvent = async (req, res) => {
  try {
    if (req.file) {
      req.body.eventImage =
        process.env.PUBLIC_URL + "/events_images/" + req.file.filename;
    }
    // add author
    req.body.author = req.user._id;
    // affect tags to event
    if (req.body.tags) {
      const selectedTag = JSON.parse(req.body.tags);
      const tags = selectedTag.map((tag) => {
        return tag.value;
      });
      req.body.tags = tags;
    }
    const event = await Event.create(req.body);
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get event by id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: "author",
        select: "firstname lastname -_id",
      })
      .populate({
        path: "tags",
        select: "name  _id",
      });
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// modify event
exports.modifyEvent = async (req, res) => {
  try {
    if (req.file) {
      req.body.eventImage =
        process.env.PUBLIC_URL + "/events_images/" + req.file.filename;
    }
    const modifiedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(modifiedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// delete event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// affect author to event
exports.affectAuthorToEvent = async (req, res) => {
  try {
    const eventAffectedAuthor = await Event.findByIdAndUpdate(
      req.params.idEvent,
      { author: req.params.idUser },
      { new: true }
    );
    res.json(eventAffectedAuthor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// desAffect author from event
exports.desAffectAuthorEvent = async (req, res) => {
  try {
    const eventDesAffectAuthor = await Event.findByIdAndUpdate(
      req.params.idEvent,
      { author: null },
      { new: true }
    );
    res.status(200).json(eventDesAffectAuthor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// affect tag to event
exports.affectTagEvent = async (req, res) => {
  try {
    const eventAffectedTag = await Event.findByIdAndUpdate(
      req.params.idEvent,
      {
        $push: { tags: req.params.idTag },
      },
      { new: true }
    );
    res.json(eventAffectedTag);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// desAffect tag from event
exports.desAffectTagEvent = async (req, res) => {
  try {
    const eventDesAffectTag = await Event.findByIdAndUpdate(
      req.params.idEvent,
      {
        $pull: { tags: req.params.idTag },
      },
      { new: true }
    );
    res.json(eventDesAffectTag);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get event with author
exports.getEventWithAuthor = async (req, res) => {
  try {
    const eventWithAuthor = await Event.findById(req.params.id).populate({
      path: "author",
      select: "firstname lastname -_id",
    });
    res.json(eventWithAuthor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get all events with authors
exports.getAllEventsWithAllAuthor = async (req, res) => {
  try {
    const eventsWithAuthors = await Event.find({}).populate({
      path: "author",
      select: "firstname lastname -_id",
    });
    res.json(eventsWithAuthors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get event with tags
exports.getEventWithTags = async (req, res) => {
  try {
    const eventWithTags = await Event.findById(req.params.id).populate({
      path: "tags",
      select: "name description -_id",
    });
    res.json(eventWithTags);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get all events with all tags
exports.getAllEventsWithAllTags = async (req, res) => {
  try {
    const eventsWithTags = await Event.find({}).populate({
      path: "tags",
      select: "name description -_id",
    });
    res.json(eventsWithTags);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
