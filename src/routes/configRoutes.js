const express = require('express');
const databaseController = require('../controllers/databaseController');

const router = express.Router();

router.get('/create-tables', databaseController.createTables);

module.exports = router;
