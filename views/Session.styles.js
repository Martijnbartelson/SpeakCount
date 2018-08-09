import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"#212121",
    },
    meetingInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      paddingTop: 20,
      paddingBottom: 20
    },
    content:{
      flex:1,
      paddingHorizontal: 0,
      paddingTop: 20,
    },
    text:{
      color: "#F1F1F1",
    },
    title:{
      color: "#FFD02B",
      fontSize: 28
    },
    h1:{
      color: "#F1F1F1",
      paddingTop: 60,
      paddingHorizontal: 20,
      fontSize: 28
    },
    h2:{
      color: "#FFD02B",
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 40,
      fontSize: 20
    },
    back: {
      padding: 0,
      marginLeft:10
    },
    button: {
      backgroundColor:"#3A7DC7",
      padding: 12,
      borderRadius: 40,
      width: 180,
      alignSelf: 'center',
      margin: 10
    },
    buttonText: {
      // fontFamily: 'amiko-regular',
      alignSelf: 'center',
      fontSize: 18,
      color: '#F1F1F1',
    },
});
