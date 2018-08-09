import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#000000",
  },
  title: {
    // fontFamily: 'amiko-regular',
    fontSize: 40,
    color: '#F1F1F1',
    marginBottom: 4
  },
  subtitle: {
    // fontFamily: 'amiko-regular',
    fontSize: 18,
    color: '#F1F1F1',
  },
  titleBg: {
    marginTop: 150,
    marginBottom: 180,
    alignSelf: 'center',
    width: '85%',
    margin: 12,
    padding: 12,
    backgroundColor:"#000000",
  },
  button: {
    backgroundColor:"#3A7DC7",
    padding: 18,
    borderRadius: 40,
    width: 250,
    alignSelf: 'center',
  },
  buttonText: {
    // fontFamily: 'amiko-regular',
    alignSelf: 'center',
    fontSize: 22,
    color: '#F1F1F1',
  },
});
