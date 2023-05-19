import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Square: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 50,
    borderColor: '#378CA7',
    borderWidth: 2,
  },
  InnerSquare: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
  },
  Text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
