const express = require("express");
const app = require('express')();
const router = express.Router();
const storieManage = require("./controller/storieManage");
const registrations = require("./controller/registrations");
const session = require("./controller/session");
//const middlewares= require('./middlewares');

// ------   registration  -------  //
router.post("/register",registrations.create);
// router.post("/redirect", registrations.redirection);
// router.get("/oauth", registrations.oauth);
// router.get("/oauth/callback", registrations.oauthcall);


// ------   Session  -------  //
router.post("/logIn", session.create);
router.post('/uploadUserImg', session.uploadImg);
router.post('/updateUser', session.update);
// router.get("/logOut", session.logOut);

// ------   manage -------  //
router.post('/create', storieManage.create);
router.post('/update', storieManage.update);
router.post('/load', storieManage.load);
router.get('/loadAll', storieManage.loadAll);
// router.get("/restaurants",restManage.findAll);
// router.get("/restaurants/:id", restManage.findOne);
// router.post("/restaurants", restManage.create);
// app.patch('/restaurants/:id', controller.update);
//router.delete('/restaurants/:id', restManage.delete);

module.exports = router; 