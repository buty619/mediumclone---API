const express = require("express");
const app = require('express')();
const router = express.Router();
const storieManage = require("./controller/storieManage");
const registrations = require("./controller/registrations");
const session = require("./controller/session");
//const middlewares= require('./middlewares');

// ------   registration  -------  //
router.post("/register",registrations.create);


// ------   Session  -------  //
router.post("/logIn", session.create);
router.post('/uploadImg', session.uploadImg);
router.post('/updateUser', session.update);
router.post('/loadUser', session.loadUser);


// ------   manage -------  //
router.post('/create', storieManage.create);
router.post('/update', storieManage.update);
router.post('/load', storieManage.load);
router.get('/loadAll', storieManage.loadAll);
router.post('/loadUserStories', storieManage.loadUserStories);
router.post('/delete', storieManage.delete);


module.exports = router; 