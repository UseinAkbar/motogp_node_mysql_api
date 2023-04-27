const router = require('express').Router();
const { user } = require('../controllers');

router.post('/user/register', user.register);

router.post('/user/login', user.login);

router.get('/user', user.getAllUser);

router.get('/user/:id', user.getUserByID);

module.exports = router;