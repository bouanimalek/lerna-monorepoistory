const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    name: String,
    description: String,
    startDateTime: Date,
    endDateTime: Date,
    location: String,
    price: Number,
    availableTicketNumber: Number,
    eventImage: String,
    eventType: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
    author: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;
