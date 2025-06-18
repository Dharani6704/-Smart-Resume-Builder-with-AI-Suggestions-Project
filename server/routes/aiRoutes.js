const express = require('express');
const router = express.Router();
const { suggestImprovements } = require('../controllers/AIController');

router.post('/suggest', suggestImprovements);

module.exports = router;
