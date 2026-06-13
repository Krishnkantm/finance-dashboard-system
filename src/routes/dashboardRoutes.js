const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController.js');
const auth = require('../middleware/auth.js');
const authorize = require('../middleware/authorize.js');

router.get('/',auth,authorize('admin','viewer','analyst'),dashboardController.getDashboard);

module.exports = router;