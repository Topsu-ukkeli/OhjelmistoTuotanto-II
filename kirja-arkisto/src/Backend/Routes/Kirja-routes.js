const express = require('express');
const HttpError = require('../models/http-error')
const KirjaControllers = require('../controllers/Kirja-controllers');
// const Kirjas = require('../models/Kirja')

const router = express.Router();

router.delete('/deletekirja/:_id',KirjaControllers.deleteKirjas);
router.patch('/:_id',KirjaControllers.updateKirjaById);
router.post('/kirjat', KirjaControllers.createKirja);
router.get('/',KirjaControllers.getAllKirjas);
module.exports = router;