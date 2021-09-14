const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html, attachments = []) => {
  //step 1: create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //step 2: mail options
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: html,
    attachments: attachments,
  };

  //step 3: sending the mail

  try {
    const data = await transporter.sendMail(mailOptions);
    // res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.log("error occurs", err);
    //res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = sendEmail;
