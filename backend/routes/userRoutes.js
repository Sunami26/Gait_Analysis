const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const authenticateUser = require('../middleware/authenticateUser');
const verifyToken = require('../middleware/verifyToken');
const { log } = require('console');


// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// GET user profile
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



// PUT update user profile
router.put('/update', authenticateUser, upload.single('avatar'), async (req, res) => {
  try {
    console.log("/update API hit");
    const userId = req.user.id; // From token


    console.log("in update req : ",req.body);
    

 
    const { firstName, lastName, email, phone, gender, country, address } = req.body;

    const updateFields = {
      firstName, lastName, email, phone, gender, country, address
    };


const fname = firstName ? firstName.trim() : "";
const lname = lastName ? lastName.trim() : "";

updateFields.fullname = `${fname} ${lname}`.trim(); // To handle both undefined & extra spaces

    console.log("updatefields : ",updateFields);
    
    if (req.file) {
      updateFields.avatar = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateFields, { new: true }).select("-_id -password -__v -updatedAt");
    if(updatedUser) console.log("updatedUser :",updatedUser);
    
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});



router.get('/getUser'  , verifyToken  ,async (req, res , next) => {
// router.get('/getUser', verifyToken, authenticateUser ,async (req, res) => {

  console.log("hello")
 const userId = req.userId;

 console.log("data" ,  userId)

    try {
        
      const user = await User.findById(req.userId).select("-password -__v -_id")
      console.log("User from db :",user);
        if (!user){
          
           return res.status(404).json({ message: "User not found" });}
       
       
       return  res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
