import React, { Component } from 'react';
import { View, Image, TouchableOpacity  } from 'react-native';
import {baseUrl} from '../constants'


export class SpeakButton extends Component {
    state = {
        uri: require(`../assets/icons/mic-init.png`),
        isSpeaking: false,
        startTurn: null,
    }
    
    handlePressIn = () => {
        this.setState({
            uri: require('../assets/icons/mic.png'), 
            startTurn: new Date().toISOString(), 
            isSpeaking: true
        }) 
    }

    handlePressOut = () => {  
        let data = {
            startTime: this.state.startTurn, 
            endTime: new Date().toISOString(),
            sessionId: this.props.sessionId,
            participantId: this.props.participantId
        }

        fetch(`${baseUrl}/turns`,{method: "POST", body: JSON.stringify(data),headers: {"Content-Type": "application/json; charset=utf-8",}})
            .then(response => console.log(response))
            .catch(error => console.error(error))        

        this.setState({uri: require(`../assets/icons/mic-init.png`), isSpeaking: false}) 
    }

    render() {
        return (

            <View style={{flex:1, marginHorizontal:20, zIndex: 10, height:220, paddingTop: 20, paddingBottom:200, alignSelf:'center'}}>

                <TouchableOpacity onPressIn={this.handlePressIn} onPressOut={this.handlePressOut} >
                    <Image source={this.state.uri} style={{borderRadius: 20}}/>
                </TouchableOpacity>
            </View>
        );
    }
}