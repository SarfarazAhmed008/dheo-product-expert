const express = require('express');
const facebookController = require('../controllers/facebookController');

const router = express.Router();

router.get('/fetch-conversations', facebookController.fetchAndStoreConversations);
router.get('/fetch-conversations/:conversationId', facebookController.fetchConversationMessages);
router.get('/fetch-latest-conversations', facebookController.fetchLatestConversations);

module.exports = router;
