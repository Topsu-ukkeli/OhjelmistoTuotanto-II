const express = require('express');
const HttpError = require('../models/http-error')
const Omakirjastocontroller = require('../controllers/OmaKirjasto-controllers');

const router = express.Router();

router.post('/createOmakirjasto/', Omakirjastocontroller.createdOmakirjasto);
router.get('/:_id', Omakirjastocontroller.getOmakirjastoById);
router.get('/',Omakirjastocontroller.getOmakirjasto);
module.exports = router;