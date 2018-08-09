import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import {Actions} from "react-native-router-flux";
import styles from './LandingPage.styles';

export default class LandingPage extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/img/bg.png')} style={{width: '100%', height: '100%'}}>
                    <View style={styles.titleBg}>
                        <Text style={styles.title}>SpeakCount</Text>
                        <Text style={styles.subtitle}>by Syn(+)ergasia</Text>
                    </View>    
                    <TouchableOpacity
                        onPress={Actions.join}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}> Join a session </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}