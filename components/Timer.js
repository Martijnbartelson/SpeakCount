import React, { Component } from 'react';
import { View } from 'react-native'
import * as Progress from 'react-native-progress';


export class Timer extends Component {
    state={count:0}

    componentWillMount () { 
        this.setState({count:this.props.time})
    }
    
    componentDidMount () {
        let counter = setInterval(() => {   
            if(this.state.count===0){clearInterval(counter); console.log('finished')}
            this.setState((previousState) => {
                  return {count: previousState.count - 1};
              });
        },1000)
    }
    
    render(){   
        return (
 
                <Progress.Bar progress={this.state.count/this.props.time}
                            width={null} 
                            height={4} 
                            borderWidth={0} 
                            borderRadius={0}
                            color={"#FFD02B"} 
                            unfilledColor={"#777777"}
/>
        )
    }
}

