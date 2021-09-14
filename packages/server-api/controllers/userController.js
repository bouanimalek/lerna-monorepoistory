const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const users = await User.find({});
      res.json(users);
    } else {
      res.json([req.user]);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// modify user
exports.modifyUser = async (req, res) => {
  try {
    if (req.file) {
      req.body.avatar = process.env.PUBLIC_URL + "/avatar/" + req.file.filename;
    }
    if (req.body.password && req.body.password !== "") {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
    }
    // } else {
    //   delete req.body.password;
    // }
    console.log(req.body);
    const modifiedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(modifiedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// affect event to user
exports.affectEventUser = async (req, res) => {
  try {
    const userAffectedEvent = await User.findByIdAndUpdate(
      req.params.idUser,
      {
        $push: { events: req.params.idEvent },
      },
      { new: true }
    );
    res.json(userAffectedEvent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// desAffect event from user
exports.desAffectEventUser = async (req, res) => {
  try {
    const userDesAffectEvent = await User.findByIdAndUpdate(
      req.params.idUser,
      {
        $pull: { events: req.params.idEvent },
      },
      { new: true }
    );
    res.json(userDesAffectEvent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get user with all events
exports.getUserWithAllEvents = async (req, res) => {
  try {
    const userWithEvents = await User.findById(req.params.id).populate({
      path: "events",
      select: "name description date -_id",
    });
    res.json(userWithEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get all users with all events
exports.getAllUsersWithAllEvents = async (req, res) => {
  try {
    const usersWithEvents = await User.find({}).populate({
      path: "events",
      select: "name description date -_id",
    });
    res.json(usersWithEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
