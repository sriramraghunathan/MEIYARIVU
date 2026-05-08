const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
  name: String,
  dob: String,
  gender: String,
  contact: String,
  presentAddress: String,
  permanentAddress: String,
  fatherName: String,
  motherName: String,
  selectedCourse: String,
  photo: String,
});

module.exports = mongoose.model("Enroll", EnrollSchema);