const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  image: String,
  summary: String,
  education: [
    {
      level: String,
      cgpa: String
    }
  ],
  skills: [String],
  experience: [String],
  projects: [
    {
      title: String,
      description: String
    }
],
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
