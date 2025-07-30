const express= require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Video = require("../models/video");


//Multer setup to store file in "uploads/" folder
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({storage: storage});

//POST route to upload video
router.post("/upload-video", upload.single("video"), async(req,res)=>{
    const {patientName} = req.body;

    if(!req.file || !patientName){
        return res.status(400).json({msg:"All fields are required."});
    }

    try{
        console.log("Saving video:", {
        patientName,
        filename: req.file.filename
    });

        const newVideo = new Video({
            patientName,
            videoPath: req.file.filename,
            uploadAt: new Date()
        });
        await newVideo.save();
        res.status(201).json({msg:"Video upload successfully"});
    } catch(err){
        console.log(err);
        res.status(500).json({msg:"Server error during upload"});
    }
});

module.exports= router;