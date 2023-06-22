const express = require('express');
const openAIController = require('../controllers/openAIController');

const router = express.Router();

router.get('/gpt-response', openAIController.getGPTResponse);
router.get('/gpt-response/:messageId', openAIController.getGPTResponseByMessageId);

module.exports = router;
