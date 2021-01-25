import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Particles from './components/Particles';
import HoverableOpacity from './components/HoverableOpacity';
import './fonts.css';

class App extends React.Component {
  render() {
    let loading = () => {
      alert("Logging into Spotify");
    };

    return (
      <View style={styles.layout}>
        <Particles/>
        <View style={styles.content}>
          <View><Text style={styles.title}>Playlist Maker</Text></View>
          <View><Text style={styles.description}>Create meaningful playlists using your Spotify Liked Songs!</Text></View>
          <HoverableOpacity style={StyleSheet.flatten(styles.button)} onHover={{...StyleSheet.flatten(styles.button), backgroundColor: '#4ac776'}} onPress={loading}>
            <Text style={styles.buttonText}>Connect with Spotify</Text>
          </HoverableOpacity>
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
  },
  title: {
    fontSize: 70,
    color: '#ffffff',
    fontFamily: 'Proxima-Nova-Bold',
  },
  description: {
    fontSize: 20,
    color: '#b3b3b3',
    fontFamily: 'Proxima-Nova-Thin',
  },
  button: {
    backgroundColor: '#1db954',
    height: '60px',
    width: '450px',
    borderRadius: '40px',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default App;
