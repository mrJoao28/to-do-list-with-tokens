const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Users,Tasks} = require("../models/model");
require("dotenv").config();

const CreateUser = async (req,res)=>{
    const username = req.body.username;
    const pwd = req.body.password;
    if (!username || !pwd) return res.status(401);
    try{
        const pwdHash = await bcrypt.hash(pwd,20);
        const newUser = await Users.create({"name":username,"password":pwdHash});
       return res.status(202).json({newUser});
    }catch(err){
       return res.status(500).json({"message":err.message});
    }
}

const AccessUser = async (req,res)=>{
    const username = req.body.username;
    const pwd = req.body.password;
    if (!pwd || !username) return res.status(401);
    try{
        const foundUser = await Users.findOne({"name":username});
        if (!foundUser) return res.status(404);
        if (!(bcrypt.compare(pwd,foundUser.password))) return res.status(405);
        const payload = {"name":username};
        const secret = process.env.SECRET
        const token = jwt.sign(payload,secret,{expiresIn:"2h"});

       return res.status(200).json({token});
    } catch(err){
       return res.status(500).json({"message":err.message});
    }
}

const getAll = async (req,res)=>{
    try {
        const data = await Tasks.find({});
       return res.status(200).json({"data":data});
    } catch(err){
        return res.status(500).json({"message":err.message});
    }
}

const getOne = async (req,res) =>{
    const name = req.body.name;
    if (!name) return res.status(401);

    try{
        const data = await Tasks.findOne({"name":name});
        if (!data) return res.status(404);
    } catch(err){
        return res.status(500).json({"message":err.message});
    }
}

const CreateTask = async (req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    if (!name) return res.status(401);
    try{
        const data = await Tasks.create({"name":name,"description":description});
        return res.status(200).json({data});
    } catch(err){
        return res.status(500).json({"message":err.message});
    }
}

const Update = async (req,res) =>{
    const oldName = req.body.oldName;
    if (!oldName) return res.status(401);
    const update ={};
    if(req.body.completed) update.completed = req.body.completed;
    if(req.body.name) update.name = req.body.name;
    if(req.body.description) update.description = req.body.description;
    try {
        await Tasks.findOneAndUpdate({"name":oldName},{$set:update});
        return res.status(200);
    } catch(err){
        return res.status(500).json({"message":err.message});
    }
}

const Delete = async (req,res) =>{
    const name = req.body.name;
    try {
        await Tasks.findOneAndDelete({"name":name});
       return res.status(200);
    } catch(err){
        return res.status(500).json({"message":err.message});
    }
}

module.exports = {Delete,Update,getOne,getAll,AccessUser,CreateUser,CreateTask}

