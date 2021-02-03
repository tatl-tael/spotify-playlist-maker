import { Linking } from "react-native";

// Commences login process using Linking
const authLogin = async () => {
    // Get Credentials from Backend Server
    const credentials = await fetch('http://localhost:5000/api/get-spotify-credentials')
    .then( response => response.json() )
    .catch( err => { console.log(err) });  

    // Setup Payload
    const data = {
      client_id: credentials.client_id,
      scope: encodeURIComponent(['user-read-email', 'user-read-private']),
      response_type: 'code',
      redirect_uri: encodeURIComponent(credentials.client_redirect_url),
    };
    const url =
      'https://accounts.spotify.com/authorize' +
      `?client_id=${data.client_id}` +
      `&response_type=${data.response_type}` +
      `&redirect_uri=${data.redirect_uri}` +
      `&scope=${data.scope}`;
    
    // Launch Spotify URL
    const result = await Linking.openURL(url);
}

export { authLogin };