const axios = require("axios");
const { get } = require("../routes/routes");

const saySomething = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

const login = async (req, res, next) => {
    const options = {
        hostname: "accounts.spotify.com",
        path: "/authorize",
        method: "GET",
    }
    const data = {
        client_id: req.app.get("client_id"),
        scope: encodeURIComponent(["user-read-email"]),
        reponse_type: "code",
        redirect_uri: encodeURIComponent("http://localhost:5000/api/check-login"),
    }
    console.log(data.redirect_uri);
    const URL = `https://accounts.spotify.com/authorize`
        + `?client_id=${data.client_id}`
        + `&reponse_type=${data.reponse_type}`
        + `&redirect_uri=${data.redirect_uri}`
        + `&scope=${data.scope}`
    const config = {
        headers: {
        }
    }
    let spotify_response = await axios.get(URL)
    .then((response) => {
        return response;
    })
    .catch((err) => {
        console.log(err);
    })
    res.status(200).json(spotify_response);

};

const checkLogin = (req, res, next) => {
    res.status(200).json({
        body: "you have logged in"
    });
};

module.exports.saySomething = saySomething;
module.exports.login = login;
module.exports.checkLogin = checkLogin;