const mongoose = require("mongoose");

const Users = mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "refreshToken":{
        type:String
    }
})

const Tasks = mongoose.Schema({
    "nameTask":{
        type:String,
        maxLength:[20,"The limit is 20 characters"],
        required:true
    },
    "description":{
        type:String,
        maxLength:[50,"The limit is 50 characters"],
    },
    "completed":{
        type:Boolean,
        default:false
    }
})
module.exports = {"Users":mongoose.model("Users",Users),"Tasks":mongoose.model("Tasks",Tasks)};