const express = require('express');
const HttpError = require('../models/http-error')
const UserControllers = require('../controllers/User-controllers');

const router = express.Router();

router.post('/users/', UserControllers.createdUser);
router.get('/',UserControllers.getAllUsers);
module.exports = router;