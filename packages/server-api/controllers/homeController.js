const Event = require("../models/eventSchema");
const moment = require("moment");

//get all events
exports.getAllEvents = async (req, res) => {
  try {
    const currentDate = new Date().toISOString();
    const events = await Event.find({ startDateTime: { $gte: currentDate } })
      .populate({
        path: "tags",
        select: "name -_id",
      })
      .populate({
        path: "author",
        select: "firstname lastname -_id",
      });
    res.json(events);
  } catch (error) {
    res.status(500).json({ messgae: "Internal server error!" });
  }
};

//modify event
exports.modifyEvent = async (req, res) => {
  try {
    if (req.file) {
      req.body.eventImage =
        process.env.PUBLIC_URL + "/events_images/" + req.file.filename;
    }
    const modifiedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(modifiedEvent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
