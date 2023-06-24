const express = require('express');
const openAIController = require('../controllers/openAIController');

const router = express.Router();

router.get('/gpt-response', openAIController.getGPTResponse);
router.get('/gpt-response-message/:messageId', openAIController.getGPTResponseByMessageId);
router.get('/gpt-response-conversation/:conversationId', openAIController.getGPTResponseByConversationId);

module.exports = router;
