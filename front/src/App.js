import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Particles from './components/Particles';
import HoverableOpacity from './components/HoverableOpacity';
import HoverableText from './components/HoverableText'
import './fonts.css';

class App extends React.Component {
  render() {
    let loading = () => {
      alert("Logging into Spotify");
    };

    let openGitHub = () => {
      window.open("https://github.com/tatl-tael/spotify-playlist-maker.git", "_blank");
    };

    return (
      <View style={styles.layout}>
        <Particles/>
        <View style={styles.content}>
          <View><Text style={styles.title}>Playlist Maker</Text></View>
          <View><Text style={styles.description}>Create meaningful playlists using your Spotify Liked Songs!</Text></View>
          <HoverableOpacity
            style={StyleSheet.flatten(styles.button)}
            hoverStyle={{...StyleSheet.flatten(styles.button), backgroundColor: '#2df162'}}
            onPress={loading}
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
