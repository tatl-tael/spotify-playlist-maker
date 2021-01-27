const axios = require('axios');
const { get } = require('../routes/routes');

const saySomething = (req, res, next) => {
  res.status(200).json({
    body: 'Hello from the server!',
  });
};

const login = async (req, res, next) => {
  const data = {
    client_id: req.app.get('client_id'),
    scope: encodeURIComponent(['user-read-email']),
    response_type: 'code',
    redirect_uri: encodeURIComponent('http://localhost:5000/api/check-login'),
  };

  const URL =
    'https://accounts.spotify.com/authorize' +
    `?client_id=${data.client_id}` +
    `&response_type=${data.response_type}` +
    `&redirect_uri=${data.redirect_uri}` +
    `&scope=${data.scope}`;
  res.redirect(URL);
};

const checkLogin = (req, res, next) => {
  res.status(200).json({
    body: 'you have logged in',
  });
};

module.exports.saySomething = saySomething;
module.exports.login = login;
module.exports.checkLogin = checkLogin;
