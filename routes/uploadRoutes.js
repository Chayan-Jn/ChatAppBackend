const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const messageController = require('../controllers/messageController');

router.post('/messages/:username',authMiddleware,uploadMiddleware.single('image'),messageController);


module.exports = router;