const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

const router = express.Router()


////Get all User
router.post('/register',registerController)
router.get('/all-users', getAllUsers);


//login

router.post('/login', loginController);

module.exports = router