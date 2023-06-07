const express = require('express');
const databaseController = require('../controllers/databaseController');

const router = express.Router();

router.get('/messages', databaseController.getMessages);

module.exports = router;
