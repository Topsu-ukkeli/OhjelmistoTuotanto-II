const express = require('express');
const HttpError = require('../models/http-error')
const KirjaControllers = require('../controllers/Kirja-controllers');

const router = express.Router();

router.post('/create/', KirjaControllers.createdKirja);
router.get('/',KirjaControllers.getAllKirjas);
module.exports = router;