const app = require("express")();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bcrypt = require("bcrypt-nodejs");
require("dotenv").config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2",
});

s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const singleUpload = upload.single("image");

exports.uploadImg = function (req, res) {
  singleUpload(req, res, (err) => {
    if (err) return console.error(err);
    console.log("carga imagen a S3");
    console.log(req.file);
    return res.json({ imageUrl: req.file.location });
  });
};

exports.logIn = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.authenticate({ email }, password);
    if (user) {
      const token = await jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "24h",
      });
      res.status(200).send({
        token,
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
          userImg: user.userImg,
          bio: user.bio,
        },
      });
      console.log(`[LOG] Successfully LogIn ${user._id} - ${user.name}`);
      return;
    } else {
      res.status(400).send({ error: "Authentication failed." });
      console.log("[LOG] Authentication failed.");
      return;
    }
  } catch (err) {
    res.status(400).send({ error: "Authentication failed." });
    console.log("[LOG] Authentication failed.", err);
    return;
  }
};

exports.updateUser = async (req, res) => {
  try {
    var decoded = await jwt.verify(req.body.token, process.env.SECRET);
    const findUser = await User.findById(decoded.userId);
    findUser.name = req.body.name;
    findUser.bio = req.body.bio;
    findUser.userImg = req.body.userImg;
    await findUser.save({});
    res.status(200).send({
      user: {
        userId: findUser._id,
        name: findUser.name,
        email: findUser.email,
        userImg: findUser.userImg,
        bio: findUser.bio,
      },
    });
    console.log(
      `[LOG] Successfully User update ${findUser._id} - ${findUser.name}`
    );
    return;
  } catch (err) {
    res.status(400).send({ error: "User Update failed." });
    console.log("[LOG] User Update failed.", err);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const decoded = await jwt.verify(req.body.token, process.env.SECRET);
    const id = decoded.userId;
    const password = req.body.password;
    const user = await User.authenticate({ _id: id }, password);
    if (user) {
      const hash = bcrypt.hashSync(req.body.newPassword);
      user.password = hash;
      await user.save({});
      res.status(200).send({
        status: "success",
        data: [],
        message: `Successfully Password Update`,
      });
      console.log(`[LOG] Successfully Password Update`);
      return;
    } else {
      res.status(400).send({ error: "Password Update failed." });
      console.log("[LOG] Password Update failed.", err);
      return;
    }
  } catch (err) {
    res.status(400).send({ error: "Password Update failed." });
    console.log("[LOG] Password Update failed.", err);
    return;
  }
};

exports.loadUser = async (req, res) => {
  const id = req.body.id;
  const findUser = await User.findById(id);
  try {
    await findUser.save({});
    console.log("se modifica carga el usuario" + id);
    res.json({
      user: {
        name: findUser.name,
        userImg: findUser.userImg,
        bio: findUser.bio,
      },
    });
  } catch (e) {
    return e;
  }
};
