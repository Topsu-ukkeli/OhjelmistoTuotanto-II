const express = require('express');
const HttpError = require('../models/http-error')
const UserControllers = require('../controllers/User-controllers');

const router = express.Router();

router.post('/createusers/', UserControllers.createdUser);
router.get('/',UserControllers.getAllUsers);
module.exports = router;