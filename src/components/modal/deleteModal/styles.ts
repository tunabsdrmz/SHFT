import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    width: '90%',
    height: 200,
    backgroundColor: '#378CA7',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    padding: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  Text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'left',
    marginTop: 10,
  },
  Image: {
    height: 32,
    width: 32,
  },
  InnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  Button: {
    width: '100%',
    alignItems: 'center',
    justfiyContent: 'center',
    backgroundColor: '#DB073D',
    borderRadius: 10,
    padding: 10,
    marginTop: 'auto',
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  CloseContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginLeft: 20,
  },
});
