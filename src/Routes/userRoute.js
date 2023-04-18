const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

router.get('/get-users', userController.getAllUsers);
router.post('/add-users', userController.addUser);
router.post('/login', userController.login);

module.exports = router;
