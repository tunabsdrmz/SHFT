import React, {useState} from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
type Props = {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const Reminder = ({enabled, setEnabled}: Props) => {
  const handleBell = () => setEnabled(prev => !prev);
  return (
    <TouchableOpacity onPress={handleBell}>
      <Image
        source={
          enabled
            ? require('../../../../assets/fonts/icons/bellEnabled.png')
            : require('../../../../assets/fonts/icons/bellDisabled.png')
        }
        style={styles.Image}
      />
    </TouchableOpacity>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  Image: {
    height: 38,
    width: 38,
    resizeMode: 'contain',
  },
});
