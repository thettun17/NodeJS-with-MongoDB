const express = require('express');

const treasureController = require('../controllers/treasure');

const router = express.Router();

router.get('/', treasureController.create);
router.post('/', treasureController.index);
router.get('/create', treasureController.terasureCreate);

router.get('/createmoney', treasureController.createmoney);

module.exports = router;