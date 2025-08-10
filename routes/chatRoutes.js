const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const {fetchMessages,searchUser} = require('../controllers/chatController');

router.post('/chat/:username',authMiddleware,uploadMiddleware.single('image'),fetchMessages);

router.get('/:username',authMiddleware,searchUser)


module.exports = router;