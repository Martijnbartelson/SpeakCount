import React, { Component } from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import {baseUrl} from '../constants'

export class LikeButton extends Component {
    state = {
        uri: require(`../assets/icons/contribution.png`),
        uri1: require(`../assets/icons/contribution.png`),
        uri2: require('../assets/icons/contribution-active.png')
    }

    like = () => {
        const data = { likeTimestamp: new Date().toString()}
        fetch(`${baseUrl}/turns/${this.props.sessionId}/contribute`,{method: "POST", body: JSON.stringify(data),headers: {"Content-Type": "application/json; charset=utf-8",}})
            .then(response => console.log(response))
            .catch(error => console.error(error))

        this.setState({ uri: this.state.uri2 })
        this.timoutHandle = setTimeout(()=>{
            this.setState({ uri: this.state.uri1 })
        }, 2000)
    }

    render() {
        return (
            <View style={{flex:1, marginHorizontal:20, height:50, alignSelf:'center', padding: 10}}>
                <TouchableOpacity onPress={() => this.like()}>
                    <Image style={{height: 70, padding:20}} source={this.state.uri}/>
                </TouchableOpacity>
            </View>
        );
    }
} 
