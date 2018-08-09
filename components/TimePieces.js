import React, { Component } from 'react';
import Svg,{Polygon} from 'react-native-svg'
import { View } from 'react-native';
import * as Progress from 'react-native-progress';


export class TimePieces extends Component {
    state={count:0}

    componentWillMount () { 
        this.setState({count:this.props.time})
    }
    
    componentDidMount () {
        let counter = setInterval(()=>{   
            if(this.state.count===0){clearInterval(counter); console.log('finished')}
            this.setState((previousState) => {
                  return {count: previousState.count - 1};
              });
        },1000)
    }

    render(){
        const {pieces} = this.props
        const colors = () => {
            if(pieces===5){return ["#FFD02B", "#FFD02B", "#FFD02B", "#FFD02B", "#FFD02B"]}
            if(pieces===4){return ["#FFD02B", "#FFD02B", "#FFD02B", "#FFD02B", "#777777"]}
            if(pieces===3){return ["#FFD02B", "#FFD02B", "#FFD02B", "#777777", "#777777"]}
            if(pieces===2){return ["#FFD02B", "#FFD02B", "#777777", "#777777", "#777777"]}
            if(pieces===1){return ["#FFD02B", "#777777", "#777777", "#777777", "#777777"]}
            if(pieces===0){return ["#777777", "#777777", "#777777", "#777777", "#777777"]}

        }
        
        return (
     
                    <View style = {
                        {
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            marginBottom: 10,
                            marginRight: 20
                        }
                    }> 
                    
                        {colors().map((timepiece,index) => 
                            <Svg key={index} height="60" width="60">
                                <Polygon
                                    points="20,5 200,80 15,95"
                                    fill={timepiece}
                                    stroke={timepiece}
                                    strokeWidth="1"
                                />
                            </Svg>)}
                    </View>
          
        )
    }
}


