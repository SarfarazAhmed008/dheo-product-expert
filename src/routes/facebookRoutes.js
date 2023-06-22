const express = require('express');
const facebookController = require('../controllers/facebookController');

const router = express.Router();

router.get('/fetch-conversations', facebookController.fetchAndStoreConversations);

module.exports = router;
