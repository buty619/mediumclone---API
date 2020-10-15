const express = require("express");
const app = require("express")();
const router = express.Router();
const storieManage = require("./controller/storieManage");
const registrations = require("./controller/registrations");
const session = require("./controller/session");
const uploadFile = require("./controller/uploadFile");
//const middlewares= require('./middlewares');

// ------   registration  -------  //
router.post("/register", registrations.create);

// ------   Session  -------  //
router.post("/logIn", session.logIn);
router.post("/uploadImg", session.uploadImg);
router.post("/uploadImg2", uploadFile.signup);
router.post("/updateUser", session.updateUser);
router.post("/loadUser", session.loadUser);
router.post("/password", session.changePassword);

// ------   manage -------  //
router.post("/create", storieManage.create);
router.post("/update", storieManage.update);
router.post("/load", storieManage.load);
router.get("/loadAll", storieManage.loadAll);
router.post("/loadUserStories", storieManage.loadUserStories);
router.post("/delete", storieManage.delete);

module.exports = router;
