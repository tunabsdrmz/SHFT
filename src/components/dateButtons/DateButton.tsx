import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Button from './button/Button';

type Props = {
  activeButton: number;
  setActiveButton: React.Dispatch<React.SetStateAction<number>>;
};
const DateButton = ({activeButton, setActiveButton}: Props) => {
  const Buttons = [
    {
      id: 1,
      name: 'Daily',
    },
    {
      id: 2,
      name: 'Weekly',
    },
    {
      id: 3,
      name: 'Monthly',
    },
  ];
  return (
    <View style={styles.Container}>
      {Buttons.map(item => (
        <Button
          key={item.id}
          id={item.id}
          name={item.name}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      ))}
    </View>
  );
};

export default DateButton;

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginTop: 15,
  },
});
