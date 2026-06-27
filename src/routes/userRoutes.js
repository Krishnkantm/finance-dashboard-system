const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.post('/register', userController.createUser);
router.post('/login', userController.login);

router.get('/', auth, authorize('admin'), userController.getUsers);

module.exports = router;