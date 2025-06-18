const Resume = require('../models/Resume');

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    const saved = await newResume.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all resumes
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a resume by ID
exports.deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a resume by ID
exports.updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
