import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  LeftActionContainer: {
    backgroundColor: '#f7ba08',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  RightActionContainer: {
    backgroundColor: '#DB073D',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  ActionImages: {
    width: 24,
    height: 24,
  },
  SwipeableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: '#FCFCFC',
  },
  SwipeableAmountText: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 'auto',
    color: '#378CA7',
  },
  SwipeableDateText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#378CA7',
  },
  SwipeableArrowIcon: {
    height: 28,
    width: 28,
  },
});
