//const mongoose = require("mongoose");
const User = require("../model/User");
var bcrypt = require('bcrypt-nodejs');
//const fetch = require('node-fetch');

exports.create = (req,res) => { 
  const hash = bcrypt.hashSync(req.body.password);  
  User.create({name:req.body.name, 
               email:req.body.email,
               password:hash,
               userImg:"https://s3.us-east-2.amazonaws.com/mediumclonemakeitreal/user2.jpg"}, err => {
    if(err){
      return console.log("ocurrio un error: ",err)
    }
    console.log("se crea usuario nuevo");
  });
  res.status(204).send({});
}

// exports.redirection = (req,res) => {
//   res.redirect("/oauth");
// }

// exports.oauth = (req,res) => { 
//   const url = "https://accounts.google.com/o/oauth2/v2/auth";
//   const clientID = process.env.GOOGLE_OAUTH_CLIENTID;
//   const responseType ="code";
//   const scope = "profile+email";
//   const redirect = "https://restaurappapi.herokuapp.com/oauth/callback";

//   res.redirect(`${url}?client_id=${clientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirect}`)
// }

// exports.oauthcall = async (req,res) => {
//   const code = req.query.code;
//   const peticion = {
//     code:code,
//     client_id : process.env.GOOGLE_OAUTH_CLIENTID,
//     client_secret: process.env.GOOGLE_OAUTH_CLIENTSECRET,
//     redirect_uri:"https://restaurappapi.herokuapp.com/oauth/callback",
//     grant_type: "authorization_code"
//   }
//   let data  = await fetch("https://oauth2.googleapis.com/token",{
//     method: "POST",
//     body: JSON.stringify(peticion)
//   })

//   token = await data.json(); 
//   const accessToken  = token.access_token;
//   const userData = "names,emailAddresses";

//   let credentials = await fetch(`https://people.googleapis.com/v1/people/me?personFields=${userData}&access_token=${accessToken}`);

//   credentials = await credentials.json();
//   userEmail = credentials.emailAddresses[0].value;
//   userNickname = credentials.names[0].givenName;

//   const hash = bcrypt.hashSync(1234);
//   try{
//     findUser = await User.findOne({email:userEmail});
//   }catch(error){
//     console.log(error);
//   }
//   if(findUser){
//     console.log("usuario ya existe");
//     res.redirect("http://localhost:3000/")
//     res.status(204).send({msg: "usuario ya existe"});
//   }else{
//     User.create({email:userEmail,password:hash,nickname:userNickname}, err => {
//       if(err){
//         return console.log("ocurrio un error: ",err)
//       }
//       console.log("usuario generado");
//     });
//     res.status(204).send({msg: "usuario creado"});
//     res.redirect("http://localhost:3000/")
//   }
// }
