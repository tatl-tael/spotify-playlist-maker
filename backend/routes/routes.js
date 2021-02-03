const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/record-login', controllers.recordLogin);
router.get('/get-my-info', controllers.getMyInfo);
router.get('/get-spotify-credentials', controllers.getSpotifyCredentials); 

module.exports = router;
