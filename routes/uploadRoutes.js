const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const imageController = require('../controllers/imageController');

router.post('/images/:username',authMiddleware,uploadMiddleware.single('image'),imageController);


module.exports = router;