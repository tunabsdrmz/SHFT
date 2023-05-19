import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    width: '90%',
    height: 250,
    backgroundColor: '#378CA7',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    padding: 15,
    marginTop: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 10,
  },
  Text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'left',
    marginTop: 10,
    marginRight: 'auto',
  },
  Image: {
    height: 32,
    width: 32,
  },
  InnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 15,
  },
  Button: {
    width: '100%',
    alignItems: 'center',
    justfiyContent: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#43a047',
    marginTop: 'auto',
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  CloseContainer: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 5,
  },
  Input: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    fontSize: 24,
    fontWeight: '700',
  },
});
