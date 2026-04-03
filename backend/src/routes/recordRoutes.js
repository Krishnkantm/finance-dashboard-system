const express = require('express');
const router = express.Router();

const recordController = require('../controllers/recordController.js');
const auth = require('../middleware/auth.js');
const authorize = require('../middleware/authorize.js');

router.post('/',auth,authorize('admin'),recordController.createRecord);

router.get('/',auth,authorize('admin','viewer','analyst'),recordController.getRecords);

router.delete('/:id',auth,authorize('admin'),recordController.deleteRecord);
router.put('/:id',auth,authorize('admin',),recordController.updateRecord);

module.exports = router;