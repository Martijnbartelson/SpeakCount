import React, { Component } from 'react'
import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {SpeakButton} from '../components/SpeakButton'
import {Bubbles} from 'react-native-loader';
import {LikeButton} from '../components/LikeButton'
import {TimePieces} from '../components/TimePieces'
import {Timer} from '../components/Timer'
import {Actions} from "react-native-router-flux";
import SocketIOClient from 'socket.io-client';
import {baseUrl} from '../constants'
import styles from './Session.styles';
import RNSoundLevel from 'react-native-sound-level';
import Svg,{Circle} from 'react-native-svg'





export default class Session extends Component {

    state = {
            participant: {},
            session: {},
            leaving: false,
            edit: {}
        }

    componentDidMount () {
        this.socket = SocketIOClient(`${baseUrl}`);
        this.socket.on('UPDATE_SESSION', data => { console.log(data);
           data.id === this.state.session.id && this.setState({session:data})})
        this.socket.on('UPDATE_PARTICIPANT', data => { data.id === this.props.participant.id && this.setState({participant:data})})

        fetch(`${baseUrl}/sessions/${this.props.sessionId}`)
            .then(response => response.json())
            .then(data=>{
                this.setState({session:data[0]})
                console.log(data[0]);
            })
            .catch(error => console.error(error))

        this.props.participant && this.setState({participant: this.props.participant})

              // var buffer = []
        // setInterval(() => {
        //     // change 5 to current db value
        //     buffer.push(5)
        //     buffer.length > 10 && buffer.shift()

        //     const payload = { participantId:this.props.participant.id, sessionId:this.props.sessionId, buffer }
        //     buffer.length === 10 && this.socket.emit('NEW_DB', payload)
        //     console.log(payload);
        // }, 200)
        RNSoundLevel.start()
        RNSoundLevel.onNewFrame = (data) => {
          // see "Returned data" section below
          // console.log('Sound level info', data)
          return this.setState({edit: data})
        }


        var buffer = []
        setInterval(() => {

            buffer.push(this.state.edit.value)
            buffer.length > 10 && buffer.shift()

            const payload = { participantId:this.props.participant.id, sessionId:this.props.sessionId, buffer }
            buffer.length === 10 && this.socket.emit('NEW_DB', payload)
            console.log(payload);
        }, 200)
    }

    // don't forget to stop it
    componentWillUnmount() {
    RNSoundLevel.stop()
    }


    render() {
        const {session, participant, leaving} = this.state


        if(!session || !participant){ return <View><Bubbles size={10} color="#FFF"/></View> }
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/img/bg_gray.png')} style={{width: '100%', height: '100%'}}>
                    { !leaving && <View style={{flex: 1}}>
                        {session.status === 'created' && <View style={styles.content}>
                            <TouchableOpacity
                                style={styles.back}
                                onPress={Actions.landing}>
                                <Image source={require('../assets/img/back.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.h1}>Waiting for session to start</Text>
                            <Text style={styles.h2}>{session.joined_participants} of {session.number_of_participants} participants joined.</Text>
                            <View style={{alignSelf: 'center'}}><Bubbles size={10} color="#FFF"/></View>
                        </View>}

                        {session.status === 'started' && <View style={styles.content}>
                            <View style={styles.meetingInfo}>
                                <View style={{marginRight: 20}}>
                                    <Text style={styles.title}>{session.topic}</Text>
                                    <Text style={styles.text}>Duration: {Math.floor(session.stimated_time/60)} minutes</Text>
                                    <Text style={styles.text}>Total seconds spoken: {participant.time_speaking_seconds} seconds</Text>

                                    {/* <Text style={styles.text}>Total seconds spoken: {participant.time_speaking_seconds} seconds</Text> */}
                                </View>

                                <TouchableOpacity onPress={()=>this.setState({leaving:true})}>
                                    <Image source={require('../assets/img/leave.png')}/>
                                </TouchableOpacity>
                            </View>

                            {/* <Svg
                                style= {{alignSelf:"center"}}
                                height="100"
                                width="100"
                            >
                              <Circle
                                  cx="50"
                                  cy="50"
                                  r= {50 + this.state.edit.value}
                                  stroke={this.state.edit.value > -25 ? "green" : "red"}
                                  strokeWidth="2.5"
                                  fill={this.state.edit.value > -25 ? "green" : "red"}
                              />
                            </Svg> */}

                            {/* <SpeakButton sessionId={session.id} participantId={participant.id}/> */}
                            <LikeButton sessionId={session.id} />


                            <Timer time={session.stimated_time}/>
                            <TimePieces pieces={participant.number_of_pieces} />

                        </View>}

                        {session.status === 'finished' && <View style={styles.content}>
                            <TouchableOpacity
                                style={styles.back}
                                onPress={Actions.landing}>
                                <Image source={require('../assets/img/back.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.h1}>The session is finished</Text>
                        </View>}
                    </View> }
                    { leaving && <View style={{flex: 1}}>
                        <Text style={styles.h1}>Are you sure?</Text>
                        <TouchableOpacity onPress={Actions.landing} style={styles.button}>
                            <Text style={styles.buttonText}>Leave session</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({leaving:false})} style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>

                    </View>}
                </ImageBackground>
            </View>
        );
    }
}
