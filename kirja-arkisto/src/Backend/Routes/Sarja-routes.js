const express = require('express');
const HttpError = require('../models/http-error')
const SarjaControllers = require('../controllers/Sarja-controllers');

const router = express.Router();

router.post('/create/', SarjaControllers.createdSarja);
router.delete('/:_id', SarjaControllers.DeleteSarjas);
router.get('/',SarjaControllers.getAllSarjas);
module.exports = router;