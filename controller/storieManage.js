const mongoose = require("mongoose");
const Storie = require("../model/Storie");

exports.create = async (req,response) => {
  await Storie.create({userId:req.body.userId,
                       publish:false}, (err,res) => {
    if(err){
      return console.log("ocurrio un error: ",err)
    }
      console.log("crea la historia : " +res._id);
      id = res._id;
      response.json(id);
    })
}

exports.update = async (req,res) =>{
  const id = req.body.id;
  console.log(id);
  const findStorie = await  Storie.findById(id);
  console.log(findStorie);
  findStorie.title = req.body.title;
  findStorie.firstP = req.body.firstP;
  findStorie.text = req.body.text;
  findStorie.img = req.body.img;
  findStorie.publish = req.body.publish;
  try{
    await findStorie.save({});
    console.log("modifica la historia")
    res.status(204).send({});
  }catch(e){
    return (e);
  }
}

exports.load = async (req,res) =>{
  const id = req.body.id;
  const findStorie = await  Storie.findById(id);  
  console.log("carga la historia : "+ id)
  console.log(findStorie);
  try{
    res.json(findStorie);
    res.status(204).send({});
  }catch(e){
    return (e);
  }
}

exports.loadAll = async (req,res) =>{
  const findAll = await  Storie.find();
  console.log("carga todas las historias")
  try{
    res.json(findAll);
    res.status(204).send({});
  }catch(e){
    return (e);
  }
}

exports.loadUserStories = async (req,res) =>{
  const id = req.body.id;
  const find = await  Storie.find({"userId":id});
  console.log("carga las historias del usuario: " + id)
  try{
    res.json(find);
  }catch(e){
    return (e);
  }
}

exports.delete = async (req,res) =>{
  const id = req.body.id;
  await  Storie.findOneAndRemove({_id:id});
  try{
    console.log("se elimina la historia : " + id);
    res.status(204).send({});
  }catch(e){
    return (e);
  }
}
