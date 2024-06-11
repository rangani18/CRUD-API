const express = require("express");

const port = 8001;

const app = express();

const mongoose = require("./config/mongoose");

const Register = require("./models/register");

app.use(express.urlencoded());

app.post("/insertdata",Register.uploadImage,async(req,res)=>{
    // console.log(req.body)
    try
    {
        let checkemail= await Register.findOne({email:req.body.email})
        if(checkemail)
        {
            return res.status(400).json({msg:"alredy exits account",status:0});
        }
        else
        {
            var imgpath=''
            if(req.file)
            {
                imgpath=Register.imagepath+"/"+req.file.filename;
            }
            req.body.image=imgpath;
            let regidata = await Register.create(req.body);
            if(regidata)
            { 
            return res.status(200).json({msg:"record insert succesfully",staus:1,'data':regidata});
            }
            else
            {
                return res.status(200).json({msg:"wrong",status:0});
            }
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({msg:"wrong",status:0});
    }
});

app.get("/alldata",async(req,res)=>{
    try
    {
        let alldata=await Register.find({})
        if(alldata)
        {
            return res.status(200).json({msg:"all records",staus:1,'record':alldata});
        }
        else
        {
            return res.status(400).json({msg:"wrong",status:0});
        }
    }
    catch(err)
    {
        return res.status(400).json({msg:"wrong",status:0});
    }
});

app.delete("/deletedata/:id",async(req,res)=>{
    try
    {
        let deleteData = await Register.findByIdAndDelete(req.params.id);
        if(deleteData)
        {
            return res.status(200).json({msg:"delete record",staus:1,'record':deleteData});
        }
        else
        {
           return res.status(400).json({msg:"wrong",status:0});
        }
    }
    catch(err)
    {
        return res.status(400).json({msg:"wrong",status:0});
    }
});

app.patch("/editdata/:id",async(req,res)=>{
    try
    {
        console.log(req.params.id);
        console.log(req.body);
        let editdt =await Register.findByIdAndUpdate(req.params.id,req.body);
        if(editdt)
        {
            let updata = await Register.findById(req.params.id);
            return res.status(200).json({msg:"edit record",staus:1,"data" :updata});
        }
        else
        {
            return res.status(400).json({msg:"wrong",status:0});
        }
    }
    catch(err){
        return res.status(400).json({msg:"wrong",status:0});

    }
})

app.listen(port,(err)=>{
    if(err){
        console.log("something wrong");
    }
    console.log("connected succesfully",port);
})