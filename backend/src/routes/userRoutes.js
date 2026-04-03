const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');
const authorize = require('../middleware/authorize.js');

router.post('/login',userController.login);
router.post('/',auth,authorize('admin'),userController.createUser);

// router.post('/',userController.createUser);

router.get('/',auth,authorize('admin','analyst','viewer'),userController.getUsers);

module.exports = router;