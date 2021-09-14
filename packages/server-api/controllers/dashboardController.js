const User = require("../models/userSchema");
const Event = require("../models/eventSchema");
const Ticket = require("../models/ticketSchema");

//get all stats
exports.getAllStats = async (req, res) => {
  try {
    const usersNumbers = await User.countDocuments();
    const eventNumbers = await Event.countDocuments();
    const ticketNumbers = await Ticket.countDocuments();
    res.json({
      users: usersNumbers,
      events: eventNumbers,
      tickets: ticketNumbers,
    });
  } catch (error) {
    res.status(500).json({ messgae: "Internal server error!" });
  }
};
