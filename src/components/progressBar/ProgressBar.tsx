import React from 'react';
import {StyleSheet, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {FilteredGoalData} from 'interface/types';

const ProgressBar = ({goalIntake, filteredData}: FilteredGoalData) => {
  let amounts = filteredData?.map(item =>
    typeof item.amount === 'string' ? parseInt(item.amount, 10) : item.amount,
  );
  let filteredAmounts = amounts.filter(element => !Number.isNaN(element));
  console.log(filteredAmounts);
  let intakeAmount = filteredAmounts.reduce((a, b) => a + b, 0);
  let progressPercentage;

  if (goalIntake) {
    progressPercentage = (intakeAmount / goalIntake) * 100;
  }

  if (Number.isNaN(progressPercentage)) progressPercentage = 100;

  if (progressPercentage && progressPercentage >= 100) progressPercentage = 100;

  return (
    <View style={styles.Container}>
      {progressPercentage !== undefined && (
        <CircularProgress
          radius={150}
          value={progressPercentage}
          activeStrokeWidth={50}
          inActiveStrokeWidth={50}
          inActiveStrokeOpacity={0.2}
          activeStrokeColor={'#7BD6F2'}
          activeStrokeSecondaryColor={'#378CA7'}
          valueSuffix={'%'}
          title={intakeAmount?.toString() + ' /'}
          subtitle={goalIntake?.toString() + ' ml'}
          subtitleStyle={{
            fontWeight: '700',
            fontSize: 22,
            fontFamily: 'roboto',
          }}
          titleStyle={{fontWeight: '700', fontSize: 22, fontFamily: 'roboto'}}
        />
      )}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
