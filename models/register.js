const express = require('express');
const path = require('path');
const multer = require('multer');
const imagepath = "/uploads"
const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    city : {
        type:String
    },
    gender : {
        type:String
    },
    image : {
        type:String
    },
    hobby : {
        type:Array
    },

})

const Imagestorage = multer.diskStorage({
    destination : function(req,file,cb)
    {
        cb(null,path.join(__dirname,"..",imagepath))
    },
    filename : function(req,file,cb)
    {
        cb(null,file.fieldname+"-"+Date.now())
    }

})

registerSchema.statics.imageuploadpath=imagepath;

registerSchema.statics.uploadImage=multer({storage : Imagestorage}).single("image");

const register = mongoose.model("Register",registerSchema);

module.exports = register;