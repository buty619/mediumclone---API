const mongoose = require("mongoose");
const Storie = require("../model/Storie");

exports.create = async (req,res) => { 
  await Storie.create({text:req.body.text,
                       title:req.body.title,
                       firstP:req.body.firstP,
                       userId:req.body.userId}, (err,res) => {
    if(err){
      return console.log("ocurrio un error: ",err)
    }
    idres = res._id;
    console.log("crea la historia :" +idres);
  });
  try{
    res.json(idres);
    res.status(204).send({});
  }catch(e){
    return e
  }
}

exports.update = async (req,res) =>{
  const id = req.body.id;
  const findStorie = await  Storie.findById(id);
  console.log(findStorie);
  findStorie.title = req.body.title;
  findStorie.firstP = req.body.firstP;
  findStorie.text = req.body.text;
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
  console.log(findStorie);
  console.log("carga una historia")
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