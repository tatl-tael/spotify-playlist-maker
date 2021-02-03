import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import Particles from './components/Particles';
import HoverableOpacity from './components/HoverableOpacity';
import HoverableText from './components/HoverableText'
import './fonts.css';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Logged In state
    this.state = {
      loggedIn: false,
      name: '',
    };
  }

  componentDidMount() { 
    // When page is mounted check if logged in
    const url = `http://localhost:5000/api/get-my-info`;
    fetch(url, { credentials: "include" })
    .then( (res) => res.json())
    .then( (json) => {
      console.log(json)
      this.setState({
        loggedIn: json.loggedIn,
        name: json.name,
      });
    })
    .catch( (err) => { console.log(err) })
  }

  render() {
    let login = async () => {
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
    };

    let openGitHub = () => {
      window.open("https://github.com/tatl-tael/spotify-playlist-maker.git", "_blank"); 
    };

    // Logged In logic
    let subtitle;
    if (this.state.loggedIn) {
      subtitle = <View><Text style={styles.description}>Welcome {this.state.name}!</Text></View>
    } else {
      subtitle = <View><Text style={styles.description}>Create meaningful playlists using your Spotify Liked Songs!</Text></View>
    }

    return (
      <View style={styles.layout}>
        <Particles/>
        <View style={styles.content}>
          <View><Text style={styles.title}>Playlist Maker</Text></View>
          {subtitle}
          <HoverableOpacity
            style={StyleSheet.flatten(styles.button)}
            hoverStyle={{...StyleSheet.flatten(styles.button), backgroundColor: '#2df162'}}
            onPress={login}
            activeOpacity={100}
          >
            <Text style={styles.buttonText}>Connect with Spotify</Text>
          </HoverableOpacity>
          <View style={styles.footer}>
            <HoverableText
              style={StyleSheet.flatten(styles.footerText)}
              hoverStyle={{...StyleSheet.flatten(styles.footerText), color: '#2df162'}}
              onPress={openGitHub}
              content="GitHub"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    position: 'fixed',
    backgroundColor: '#212121',
  },
  content: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    top: '20%',
    height: '30%'
  },
  title: {
    fontSize: 70,
    color: '#ffffff',
    fontFamily: 'Proxima-Nova-Bold',
  },
  description: {
    fontSize: 20,
    color: '#b3b3b3',
    fontFamily: 'Proxima-Nova-Regular',
  },
  button: {
    backgroundColor: '#1db954',
    height: '60px',
    width: '450px',
    borderRadius: '40px',
    justifyContent: 'center',
    top: '20%',
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  footer: {
    alignItems: 'center',
    position: 'fixed',
    bottom: '3%',
  },
  footerText: {
    fontSize: 18,
    fontFamily: 'Proxima-Nova-Regular',
    color: '#1db954',
  },
});

export default App;
