import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native';
import {Actions} from "react-native-router-flux";
import styles from './JoinSession.styles';
import {baseUrl} from '../constants'
import {Bubbles} from 'react-native-loader';

export default class JoinSession extends Component {
    state = {
        sessionId: null,
        name:'',
        view: 'name'
    }

    joinSession = () => {


        fetch(`${baseUrl}/join`,{method: "POST", body: JSON.stringify({code:this.state.sessionId}),headers: {"Content-Type": "application/json; charset=utf-8",}})
            .then(response => response.json())
            .then(participant=>{
                if(participant[0]){ Actions.push('session',{participant:participant[0],sessionId:this.state.sessionId, participantName:this.state.name}) }
                if(!participant[0]){ return this.setState({view:'error',sessionId: null}) }
                console.log(participant[0]);
            })
            .catch((error) => {
                console.error(error);
                this.setState({view:'error'})
            });

         this.setState({view:'loading'})
    }

    render() {
        const {view,name,sessionId,loading} = this.state
        sessionId !== null && sessionId.toString().length === 4 && this.state.view !== 'loading' && this.joinSession()

        return (

            <KeyboardAvoidingView style={styles.container} behavior="position"   keyboardVerticalOffset={
                Platform.select({
                   ios: () => -100,
                   android: () => -150
                })()
              }>
            <ImageBackground source={require('../assets/img/bg_gray.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.content}>
                    {view === 'name' && <View>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={Actions.landing}>
                            <Image source={require('../assets/img/back.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>Enter your name</Text>
                        <TextInput
                            style={styles.input}
                            autoFocus={true}
                            onChangeText={(name) => this.setState({name})}
                        />
                        <TouchableOpacity
                            onPress={()=>this.setState({view:'session'})}
                            style={name.length===0 ? styles.buttonDisabled : styles.button}
                            disabled={name.length===0}
                        >
                            <Text style={styles.buttonText}> Continue </Text>
                        </TouchableOpacity>
                    </View>}

                    {view === 'session' && <View>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={()=>this.setState({view:'name'})}>
                            <Image source={require('../assets/img/back.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>Enter the session code</Text>
                        <Text style={styles.text}>Enter the code shown on the display in the meeting room.</Text>
                        <TextInput
                            style={styles.input}
                            autoFocus={true}
                            keyboardType={'numeric'}
                            maxLength={4}
                            onChangeText={(sessionId) => this.setState({sessionId})}
                        />

                    </View>}

                    {view === 'error' && <View>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={()=>this.setState({view:'session'})}>
                            <Image source={require('../assets/img/back.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>Session not found</Text>
                    </View>}

                    {view === 'loading' && <View>
                        <Bubbles size={10} color="#FFF"/>
                     </View>}
                </View>
            </ImageBackground>
            </KeyboardAvoidingView>

        );
    }
}
