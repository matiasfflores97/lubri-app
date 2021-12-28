const express           = require('express');
const router            = express.Router();
const loginController   = require('../controllers/loginController');

router.post('/login', loginController.getUser)
router.post('/register', loginController.createUser)

module.exports = router;