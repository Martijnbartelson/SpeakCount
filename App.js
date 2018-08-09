import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Session from './views/Session';
import JoinSession from './views/JoinSession';
import LandingPage from './views/LandingPage';
// import { Font } from 'expo';
import { View, StatusBar, Text } from 'react-native';
import styles from './App.styles';

export default class App extends Component {
  state = { fontLoaded: false }

  async componentDidMount() {
    StatusBar.setHidden(true);
    console.disableYellowBox = true;

    // await Font.loadAsync({
    //   'amiko-regular': require('./assets/fonts/Amiko-Regular.ttf'),
    // });

    this.setState({ fontLoaded: true });

  }

  render() {
    if(!this.state.fontLoaded){ return <View><Text>'loading'</Text></View> }

    return (
      <View style={styles.container}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="landing" component={LandingPage} initial={true}/>
            <Scene key="join" component={JoinSession} title="<" />
            <Scene key="session" component={Session} title="Session" />
          </Scene>
        </Router>
      </View>
    );
  }
}
