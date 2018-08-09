import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor:"#212121",
    flex:1,
  },
  content:{
    flex:1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    marginTop: 80,
    color: '#F1F1F1'
  },
  text: {
    color: '#F1F1F1'
  },
  input: {
    height: 40,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 2,
    marginTop: 50,
    marginBottom: 70,
    color: '#FFFFFF',
    fontSize: 26,
  },
  button: {
    backgroundColor:"#3A7DC7",
    padding: 12,
    borderRadius: 40,
    width: 180,
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor:'#777777',
    padding: 12,
    borderRadius: 40,
    width: 180,
    alignSelf: 'center',
  },
  buttonText: {
    // fontFamily: 'amiko-regular',
    alignSelf: 'center',
    fontSize: 18,
    color: '#F1F1F1',
  },
  back: {
    padding: 0,
    marginLeft:-15
  },

});
