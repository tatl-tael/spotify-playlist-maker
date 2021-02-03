const axios = require('axios');
const { get } = require('../routes/routes');
const btoa = require('btoa');
const e = require('express');

const recordLogin = async (req, res, next) => {
  // Error Handler
  if ("error" in req.query) {
    console.log("Error in login");
    res.status(400).json({
      body: "Error when signing in with Spotify",
    });
  }
  // Success Handler
  else {
      // Payload Information
      const AUTHORIZATION_CODE = req.query.code;
      const CLIENT_ID = req.app.get('client_id')
      const CLIENT_SECRET = req.app.get('client_secret')
      const AUTH = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      
      // Setup Request
      let config = {
        headers: {
            'Authorization': `Basic ${AUTH}`,
            'content-type': 'application/x-www-form-urlencoded',
        }
      }
      let data = {
        grant_type: 'authorization_code',
        code: AUTHORIZATION_CODE,
        redirect_uri: encodeURIComponent('http://localhost:5000/api/record-login'),
      }
      const URL = 'https://accounts.spotify.com/api/token';
      const body = `grant_type=${data.grant_type}&code=${data.code}&redirect_uri=${data.redirect_uri}`;

      // Sending Request
      let response = await axios.post(URL, body, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err)
      })
      console.log(`RECIEVED ACCESS_TOKEN: ${response.access_token}`)
      res.cookie('access_token', response.access_token, {expires: new Date(3600000 + Date.now()),});

      console.log(JSON.stringify(req.cookies));

      // Response to Request
      res.redirect('http://localhost:3000/');
  }
};

const getMyInfo = async (req, res, next) => {
  // Set Security headers to allow use of credentials
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Check to see if logged in (cookie exists)
  if (typeof req.cookies.access_token == 'undefined') {
    // Return info (user not logged in)
    res.status(200).json({
      loggedIn: false,
      name: '',
    })
    return
  }

  // Setup payload
  let access_token = req.cookies.access_token;
  const ME_URL = 'https://api.spotify.com/v1/me';
  let config = {
    headers: {
        'Authorization': `Bearer ${access_token}`,
    }
  }

  // Get Info from Spotify
  let name = await axios.get(ME_URL, config)
  .then( (response) => response.data.display_name)
  .catch( (err) => { console.log(err) })  
  
  // Return info (user logged in)
  res.status(200).json({
    loggedIn: true,
    name: name,
  })
}

const getSpotifyCredentials = async ( req, res, next ) => {
  // Return credentials
  res.status(200).json({ client_id: req.app.get('client_id') });
}

module.exports.recordLogin = recordLogin;
module.exports.getMyInfo = getMyInfo;
module.exports.getSpotifyCredentials = getSpotifyCredentials
