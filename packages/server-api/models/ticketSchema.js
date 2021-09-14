const mongoose = require("mongoose");
const { Schema } = mongoose;


const ticketSchema = new Schema({
    qrCode: String,
    qrCodePath: String,
    ticketPath: String,
    owner: {type: Schema.Types.ObjectId, ref: "Users"},
    event: {type: Schema.Types.ObjectId, ref: "Events"}
},
{
  timestamps: true,
  versionKey: false,
}
);

const Ticket = mongoose.model("Tickets", ticketSchema);

module.exports = Ticket;