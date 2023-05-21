import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {FilteredGoalData} from '../../../interface/types';
import {useAtom} from 'jotai';
import {recommendText} from '../../api/atoms';

const RecommedText = ({filteredData, goalIntake}: FilteredGoalData) => {
  const [text, setText] = useAtom(recommendText);
  let amounts = filteredData?.map(item =>
    typeof item.amount === 'string' ? parseInt(item.amount, 10) : item.amount,
  );
  let filteredAmounts = amounts.filter(element => !Number.isNaN(element));
  let intakeAmount = filteredAmounts.reduce((a, b) => a + b, 0);
  let progressPercentage;

  if (goalIntake) {
    progressPercentage = (intakeAmount / goalIntake) * 100;
  }

  if (Number.isNaN(progressPercentage)) progressPercentage = 100;

  if (progressPercentage && progressPercentage >= 100) progressPercentage = 100;

  if (progressPercentage) {
    if (progressPercentage >= 0 && progressPercentage <= 25)
      setText('You should drink more water!');
    if (progressPercentage >= 25 && progressPercentage <= 50)
      setText('Keep going!');
    if (progressPercentage >= 50 && progressPercentage <= 75)
      setText('Keep going almost there!');
    if (progressPercentage >= 75 && progressPercentage <= 100)
      setText('Congrats!');
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>{text}</Text>
    </View>
  );
};

export default RecommedText;
