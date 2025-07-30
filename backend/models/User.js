const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phone: String,
  gender: String,
  patientId: String,
  address: String,
  country: String,
  avatar: String,
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema, "gait_users");

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true },
//   phone: String,
//   gender: String,
//   country: String,
//   address: String,
//   avatar: String, // store file path like /uploads/avatar.jpg
//   password: String, // hashed
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
