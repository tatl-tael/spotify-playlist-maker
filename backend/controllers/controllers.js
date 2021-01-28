const axios = require("axios");
const { get } = require("../routes/routes");
const btoa = require("btoa");

const saySomething = (req, res, next) => {
  res.status(200).json({
    body: "Hello from the server!",
  });
};

const login = async (req, res, next) => {
  // Payload Information
  const data = {
    client_id: req.app.get("client_id"),
    scope: encodeURIComponent(["user-read-email", "user-read-private"]),
    response_type: "code",
    redirect_uri: encodeURIComponent("http://localhost:5000/api/check-login"),
  };

  // Setup Redirect URL
  const URL =
    "https://accounts.spotify.com/authorize" +
    `?client_id=${data.client_id}` +
    `&response_type=${data.response_type}` +
    `&redirect_uri=${data.redirect_uri}` +
    `&scope=${data.scope}`;

  // Redirect User to URL
  res.redirect(URL);
};

const checkLogin = async (req, res, next) => {
  /* TODO - Check to see if there is an existing cookie with ACCESS_TOKEN
  if so: check to see if token is expired (if so refresh token)
  if not: then proceed with token retrieval */

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
    const CLIENT_ID = req.app.get("client_id");
    const CLIENT_SECRET = req.app.get("client_secret");
    const AUTH = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    // Setup Request
    let config = {
      headers: {
        Authorization: `Basic ${AUTH}`,
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    let data = {
      grant_type: "authorization_code",
      code: AUTHORIZATION_CODE,
      redirect_uri: encodeURIComponent("http://localhost:5000/api/check-login"),
    };

    const URL = "https://accounts.spotify.com/api/token";
    const body = `grant_type=${data.grant_type}&code=${data.code}&redirect_uri=${data.redirect_uri}`;

    // Sending Request
    let response = await axios
      .post(URL, body, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    res.cookie("access_token", response.access_token);

    // Response to Request
    res.status(200).json({
      msg: response,
    });
  }
};

const getUserInfo = async (req, res, next) => {
  /* TODO - Check to see if ACCESS_TOKEN has expired
  if so: refresh token
  if not: proceed */
  
  const ACCESS_TOKEN = req.cookies.access_token;
  const URL = 'https://api.spotify.com/v1/me';

  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }

  let response = await axios
    .get(URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err)
    });

  res.status(200).json({
    msg: response,
  });
}

module.exports.saySomething = saySomething;
module.exports.login = login;
module.exports.checkLogin = checkLogin;
module.exports.getUserInfo = getUserInfo;
