const Ticket = require("../models/ticketSchema");

// get all tickets
exports.getAllTcikets = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const tickets = await Ticket.find({})
        .populate({
          path: "owner",
          select: "firstname lastname -_id",
        })
        .populate({
          path: "event",
          select: "name -_id",
        });
      res.json(tickets);
    } else {
      const ownerTickets = await Ticket.find({ owner: req.user._id }).populate(
        "owner event"
      );
      res.json(ownerTickets);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// delete
exports.deleteTicket = async (req, res) => {
  try {
    const deletedticket = await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
