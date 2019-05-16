const User = require("../model/User");
var bcrypt = require('bcrypt-nodejs');

exports.create = (req,res) => { 
  const hash = bcrypt.hashSync(req.body.password);  
  User.create({name:req.body.name, 
               email:req.body.email,
               password:hash,
               userImg:"https://s3.us-east-2.amazonaws.com/mediumclonemakeitreal/user2.jpg",
               bio: "Enter a short bio"}, err => {
    if(err){
      return console.log("ocurrio un error: ",err)
    }
    console.log("se crea usuario nuevo");
  });
  res.status(204).send({});
}
