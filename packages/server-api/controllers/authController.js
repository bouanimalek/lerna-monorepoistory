const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// create registerApi(check if email is already used)
exports.register = async (req, res) => {
  try {
    const userVerify = await User.findOne({
      email: req.body.email,
    });
    if (userVerify) {
      res.status(400).json({ message: "Failed! Email already in use!" });
    } else {
      //hash password
      const saltRounds = 10;
      const hash = await bcrypt.hash(req.body.password, saltRounds);

      const userData = req.body;
      userData.password = hash;
      const newUserHashPwd = await User.create(userData);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUserHashPwd });
    }
  } catch (err) {
    res.status(400).json({ message: "erreur hash pwd" });
  }
};

// login with jwt
exports.login = async (req, res) => {
  // bcrypt.compare(req.body.password, hash, function(err, result) {
  // result == true
  //  });
  try {
    const userDb = await User.findOne({
      email: req.body.email,
    });
    if (userDb) {
      //   console.log(userDb);
      const result = await bcrypt.compare(req.body.password, userDb.password);

      if (result) {
        //  console.log('success');
        //create jwt token
        const tokenData = {
          userId: userDb._id,
          email: userDb.email,
          firstname: userDb.firstname,
          lastname: userDb.lastname,
          avatar: userDb.avatar,
          role: userDb.role,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.json({
          message: `You are logged in as ${userDb.firstname}`,
          token: token,
        });
      } else {
        res.status(400).json({ message: "wrong credentials" });
      }
    } else {
      res.status(400).json({ message: "wrong credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

// logout with bearer
exports.logout = async (req, res) => {
  req.logout();
  res.json({ message: "You are logged out!" });
};
