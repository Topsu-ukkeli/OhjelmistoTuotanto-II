const express = require('express');
const HttpError = require('../models/http-error')
const Omakirjastocontroller = require('../controllers/OmaKirjasto-controllers');

const router = express.Router();

router.post('/createOmakirjasto/', Omakirjastocontroller.createdOmakirjasto);
router.delete('/:_id',Omakirjastocontroller.DeleteOmakirja);
router.get('/:_id', Omakirjastocontroller.getOmakirjastoById);
module.exports = router;