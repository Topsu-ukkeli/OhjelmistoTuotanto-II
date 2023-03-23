const express = require('express');
const HttpError = require('../models/http-error')
const UserControllers = require('../controllers/User-controllers');

const router = express.Router();

router.post('/createusers/', UserControllers.createdUser);
router.delete('/:_id',UserControllers.DeleteUser);
router.patch('/:_id',UserControllers.updateUserById);
router.get('/',UserControllers.getAllUsers);
module.exports = router;