const User = require("../models/userSchema");
const Token = require("../models/tokenSchema");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "user with given email doesn't exist" });
    } else {
      //step0: find token
      const token = await Token.findOne({ userId: user._id });
      if (token) await token.deleteOne();
      // step1: create token
      const tokenString = crypto.randomBytes(32).toString("hex");
      const tokenData = {
        userId: user._id,
        token: tokenString,
      };
      await Token.create(tokenData);
      // step2: send email
      const resetPasswordTemplatePath = path.resolve(
        "./template",
        "resetPasswordTemplate.html"
      );
      const emailTemplate = fs.readFileSync(resetPasswordTemplatePath, {
        encoding: "utf-8",
      });
      const link = `${process.env.BASE_URL}/reset-password/${tokenString}`;
      const emailParams = {
        name: `${user.firstname}`,
        link: link,
      };
      const resetPasswordRender = ejs.render(emailTemplate, emailParams);

      await sendEmail(user.email, "Password reset", resetPasswordRender);
      res.json({ message: "password reset link sent to your email account" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    if (token) {
      const user = await User.findById(token.userId);
      if (!user) {
        res.status(400).send("user not found");
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        user.password = hash;
        await user.save();
        await token.deleteOne();
        res.json({
          message: "your password has been modified successfully!",
        });
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid or expired password reset token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
