import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {styles} from './styles';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({value, setValue}: Props) => {
  return (
    <View style={styles.Container}>
      <TextInput
        style={styles.Input}
        placeholder="1"
        value={value}
        onChangeText={setValue}
        keyboardType="number-pad"
      />
    </View>
  );
};

export default Input;
