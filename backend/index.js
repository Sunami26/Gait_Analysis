const express= require("express");
const mongoose= require("mongoose");
const dotenv = require('dotenv');
const cors= require("cors");
const path = require('path');

const uploadRoutes = require("./routes/upload")
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app= express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // expose avatars

app.use("/api", uploadRoutes)
app.use("/auth", require("./routes/auth"));
app.use('/api/user', userRoutes); 

// app.use("/api", require("./routes/userRoutes")); // assuming profile route is inside userRoutes.js


mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=> console.log("Mongo Error:",err));


app.listen(5000, ()=> console.log("Server is running on port 5000"))