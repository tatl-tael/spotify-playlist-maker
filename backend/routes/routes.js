const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get("/login", controllers.login);

router.get('/say-something', controllers.saySomething);

router.get('/check-login', controllers.checkLogin);
module.exports = router;