const app = require('express')();
const User = require("../model/User");
const jwt = require('jsonwebtoken');

exports.create =  async function(req, res, next) {  
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.authenticate(email, password);
    if (user) {
      const token = await jwt.sign({user:user._id},"secret key");
      console.log("usuario logueado")
      res.json({token,user:{userId:user._id,name:user.name,email:user.email,userImg:user.userImg}});
      res.status(204).send({msg : 'ok log in'});
    } else {
      res.status(401).send({});
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: 'Authentication failed.' });
  }
}

// exports.logOut = async function(req, res){
//   req.session = null;
// }