const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/API-NODE2629");

const db = mongoose.connection;

db.once('open',(err)=>{
    if(err){
        console.log("db not connected");
    }
    else{
        console.log("db connected");
    }
})

module.exports = db;