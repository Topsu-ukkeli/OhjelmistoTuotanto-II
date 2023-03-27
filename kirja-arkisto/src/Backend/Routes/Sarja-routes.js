const express = require('express');
const HttpError = require('../models/http-error')
const SarjaControllers = require('../controllers/Sarja-controllers');

const router = express.Router();

router.post('/createSarja/', SarjaControllers.createdSarja);
router.patch('/:_id',SarjaControllers.updateSarjaById);
router.delete('/:_id', SarjaControllers.DeleteSarjas);
router.get('/',SarjaControllers.getAllSarjas);
router.get('/image/:_id',SarjaControllers.getSarjaImage);
router.get('/:_id',SarjaControllers.getSarjabyId);
module.exports = router;