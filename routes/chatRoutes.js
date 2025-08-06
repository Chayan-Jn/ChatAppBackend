const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const {fetchMessages} = require('../controllers/chatController');

router.post('/chat/:username',authMiddleware,uploadMiddleware.single('image'),fetchMessages);


module.exports = router;