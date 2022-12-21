const mongoose = require("mongoose")
// import autoIncrement from 'mongoose-auto-increment';

const userschema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    }
    
})

const locationSchema=mongoose.Schema({
    longitude:{
        type: String,
        required:true
    },
    latitude:{
        type: String,
        required:true
    }
})

// autoIncrement.initialize(mongoose.connection);
// ideasSchema.plugin(autoIncrement.plugin, 'Users');

const locationModel = mongoose.model("Location",locationSchema)

const userModel = mongoose.model("Users", userschema);

module.exports={userModel,locationModel};  