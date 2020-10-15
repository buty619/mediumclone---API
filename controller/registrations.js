const User = require("../model/User");
const bcrypt = require("bcrypt-nodejs");

exports.create = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password);
  const findUser = await User.find({ email: req.body.email });
  console.log(findUser);
  if (findUser.length > 0) {
    res.status(400).send({
      status: "error",
      data: [],
      message: `User already exist whit email: ${req.body.email}`,
    });
    console.log(`[LOG] User already exist whit email: ${req.body.email}`);
    return;
  }
  try {
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        userImg:
          "https://s3.us-east-2.amazonaws.com/mediumclonemakeitreal/user2.jpg",
        bio: "Enter a short bio",
      },
      (err) => {
        if (err) {
          res.status(400).send({ error: "User Creation failed." });
          console.error("User Creation failed.");
          return;
        } else {
          res.status(200).send({
            status: "success",
            data: [],
            message: `Successfully create user ${req.body.name}`,
          });
          console.log(`[LOG] Successfully create user ${req.body.name}`);
          return;
        }
      }
    );
  } catch (err) {
    res.status(400).send({ error: "User Creation failed." });
    console.log("[LOG] User Creation failed.", err);
  }
};
