const mongoose= require("mongoose");

const videoSchema = new mongoose.Schema({
    patientName: {type:String, required: true},
    videoPath: {type: String, required:true},
    uploadedAt: {type: Date, default: Date.now}
});

module.exports= mongoose.model("Video", videoSchema);