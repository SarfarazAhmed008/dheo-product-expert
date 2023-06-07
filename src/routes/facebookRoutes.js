const express = require('express');
const facebookController = require('../controllers/facebookController');

const router = express.Router();

router.get('/fetch', facebookController.fetchAndStoreMessages);

module.exports = router;
