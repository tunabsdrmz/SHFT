import {Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import {useAtomValue, useSetAtom} from 'jotai';
import {goalDataId, valueAtom} from '../../api/atoms';

const SaveButton = () => {
  const setGoalDataId = useSetAtom(goalDataId);
  const value = useAtomValue(valueAtom);
  const handleSave = () => {
    setGoalDataId(value);
  };
  return (
    <TouchableOpacity style={styles.Container} onPress={handleSave}>
      <Image
        style={styles.Image}
        source={require('../../../assets/fonts/icons/add.png')}
      />
    </TouchableOpacity>
  );
};

export default SaveButton;
