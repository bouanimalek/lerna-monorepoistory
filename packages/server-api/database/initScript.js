const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

User.countDocuments()
  .then(async (userCount) => {
    if (userCount === 0) {
      // insert default user and default admin
      const hash = await bcrypt.hash("azerty", 10);
      const users = [
        {
          firstname: "malzako",
          lastname: "malek",
          email: "malzovich@gmail.com",
          password: hash,
          address: "3 rue marseille tunis",
          role: "admin",
          phone: "20203300",
          birthDate: new Date(736605680000),
        },
        {
          firstname: "bou",
          lastname: "malzakk",
          email: "malek@gmail.com",
          password: hash,
          address: "3 rue paris tunis",
          phone: "29213350",
          birthDate: new Date(326637680000),
        },
      ];
      User.insertMany(users)
        .then((insertedUsers) => {
          console.log("==> users inserted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
  .catch((error) => {
    console.log(error);
  });
