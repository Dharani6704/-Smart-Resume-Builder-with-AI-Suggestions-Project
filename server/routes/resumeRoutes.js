const express = require('express');
const router = express.Router();
const {
  createResume,
  getResumes,
  deleteResume,
  updateResume
} = require('../controllers/ResumeController');

router.post('/', createResume);
router.get('/', getResumes);
router.delete('/:id', deleteResume);     
router.put('/:id', updateResume);       

module.exports = router;
