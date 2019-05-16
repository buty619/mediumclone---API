const app = require('express')();
const User = require("../model/User");
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config()

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
});

s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      acl: 'public-read',
      contentType: function (req, file, cb) {
        cb(null, file.mimetype);
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      }
  })
});

const singleUpload = upload.single('image');

exports.uploadImg = function(req, res) {  
  singleUpload(req,res, (err) =>{
    if (err) return console.error(err);
    console.log("carga imagen a S3")
    return res.json({'imageUrl':req.file.location});
  });
}

exports.create =  async function(req, res, next) {  
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.authenticate(email, password);
    if (user) {
      const token = await jwt.sign({user:user._id},"secret key");
      console.log("usuario logueado")
      res.json({token,user:{userId:user._id,
                            name:user.name,
                            email:user.email,
                            userImg:user.userImg,
                            bio:user.bio}});
    } else {
      res.status(401).send({});
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: 'Authentication failed.' });
  }
}

exports.update = async (req,res) =>{
  const id = req.body.id;
  const findUser = await  User.findById(id);
  findUser.name = req.body.name;
  findUser.bio = req.body.bio;
  findUser.userImg = req.body.userImg;
  try{
    await findUser.save({});
    console.log("se modifica Usuario")
    res.json({user:{userId:findUser._id,
                    name:findUser.name,
                    email:findUser.email,
                    userImg:findUser.userImg,
                    bio:findUser.bio}});
  }catch(e){
    return (e);
  }
}

exports.loadUser = async (req,res) =>{
  const id = req.body.id;
  const findUser = await  User.findById(id);
  try{
    await findUser.save({});
    console.log("se modifica carga el usuario" + id);
    res.json({user:{name:findUser.name,
                    userImg:findUser.userImg,
                    bio:findUser.bio}});
  }catch(e){
    return (e);
  }
}