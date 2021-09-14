const Ticket = require("../models/ticketSchema");
const Event = require("../models/eventSchema");
const QRCode = require("qrcode");
const path = require("path");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const ejs = require("ejs");
const sendEmail = require("../utils/sendEmail");

exports.createReservation = async (req, res) => {
  try {
    const event = await Event.findById(req.params.idEvent);
    if (event.availableTicketNumber != 0) {
      // step 1: create new ticket
      const ticketData = {
        qrCode: "",
        qrCodePath: "",
        ticketPath: "",
        owner: req.user._id,
        event: event._id,
      };
      const newTicket = await Ticket.create(ticketData);
      // step 2: create new qrCode for this ticket
      const qrCodeData = {
        eventId: event._id,
        eventName: event.name,
        address: event.location,
        emailOwner: req.user.email,
        fullNameOwner: `${req.user.firstname} ${req.user.lastname}`,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        createdAt: newTicket.createdAt,
      };
      await QRCode.toFile(
        `./public/qrCodes/${newTicket._id}.png`,
        JSON.stringify(qrCodeData),
        {
          color: {
            dark: "#00F", // Blue dots
            light: "#0000", // Transparent background
          },
        }
      );
      newTicket.qrCode = JSON.stringify(qrCodeData);
      newTicket.qrCodePath = `${process.env.PUBLIC_URL}/qrCodes/${newTicket._id}.png`;
      // step 3: create pdf file
      const templatePath = path.resolve("./template", "testTemplate.html");
      const template = fs.readFileSync(templatePath, { encoding: "utf-8" });
      const pdfParams = {
        name: `${req.user.firstname} ${req.user.lastname}`,
        eventId: `${event._id}`,
        eventName: `${event.name}`,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        address: `${event.location}`,
        price: event.price,
        qrCodeLink: newTicket.qrCodePath,
      };
      const render = ejs.render(template, pdfParams);
      // pdf options
      const options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        // header: {
        //   height: "45mm",
        //   contents: '<div style="text-align: center;">Author: Malek Bou</div>',
        // },
        // footer: {
        //   height: "28mm",
        //   contents: {
        //     first: "Cover page",
        //     2: "Second page", // Any page number is working. 1-based index
        //     default:
        //       '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        //     last: "Last Page",
        //   },
        // },
      };
      const document = {
        html: render,
        data: {},
        path: `./public/tickets_pdf/${newTicket._id}.pdf`,
        type: "",
      };
      await pdf.create(document, options);
      newTicket.ticketPath = `${process.env.PUBLIC_URL}/tickets_pdf/${newTicket._id}.pdf`;
      await newTicket.save();

      // substract ticket number
      await Event.findByIdAndUpdate(
        event._id,
        { $inc: { availableTicketNumber: -1 } },
        { new: true }
      );
      // send mail to the connected user
      const reservationTemplatePath = path.resolve(
        "./template",
        "reservationTemplate.html"
      );
      const emailTemplate = fs.readFileSync(reservationTemplatePath, {
        encoding: "utf-8",
      });
      const emailParams = {
        name: `${req.user.firstname}`,
      };
      const reservationRender = ejs.render(emailTemplate, emailParams);
      const attachments = [
        {
          filename: "ticket.pdf",
          content: fs.createReadStream(
            `./public/tickets_pdf/${newTicket._id}.pdf`
          ),
        },
      ];
      await sendEmail(
        req.user.email,
        "Reservation Ticket",
        reservationRender,
        attachments
      );

      res.json({
        message: "please check your email, your ticket has been sent!",
      });
    } else {
      res
        .status(400)
        .json({ message: "Can not make reservation! Tickets are sold out!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
