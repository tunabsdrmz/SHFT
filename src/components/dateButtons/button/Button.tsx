import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
type Props = {
  id: number;
  name: string;
  activeButton: number;
  setActiveButton: React.Dispatch<React.SetStateAction<number>>;
};

const Button = ({id, name, activeButton, setActiveButton}: Props) => {
  const handleActiveBox = () => setActiveButton(id);
  return (
    <TouchableOpacity
      style={styles.Container}
      key={id}
      onPress={handleActiveBox}>
      <View style={styles.Square}>
        <View
          style={[
            styles.InnerSquare,
            activeButton === id
              ? {backgroundColor: '#378CA7'}
              : {borderColor: '#A1A1AA'},
          ]}
        />
      </View>
      <Text
        style={[
          styles.Text,
          activeButton === id ? {color: '#378CA7'} : {color: '#A1A1AA'},
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
