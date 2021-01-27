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

const checkLogin = async (req, res, next) => {
  if ('error' in req.query) {
      console.log('Error in login');
      res.status(400).json({
          body: 'Error when signing in with Spotify'
      });
  }
  else {
      const AUTHORIZATION_CODE = req.query.code;
      const CLIENT_ID = req.app.get('client_id')
      const CLIENT_SECRET = req.app.get('client_secret')
      const AUTH = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
      let config = {
        headers: {
            'Authorization': `Basic ${AUTH}`,
            'content-type': 'application/x-www-form-urlencoded',
        }
      }
      let data = {
        grant_type: 'authorization_code',
        code: AUTHORIZATION_CODE,
        redirect_uri: encodeURIComponent('http://localhost:5000/api/check-login'),
      }
      const URL = 'https://accounts.spotify.com/api/token';
      const body = `grant_type=${data.grant_type}&code=${data.code}&redirect_uri${data.redirect_uri}`;

      let response = await axios.post(URL, body, config)
      .then((response) => {
        return JSON.stringify(response)
      })
      .catch((err) => {
          console.log(err)
      })

      res.status(200).json({
          msg: response
      })
  }
};

module.exports.saySomething = saySomething;
module.exports.login = login;
module.exports.checkLogin = checkLogin;
