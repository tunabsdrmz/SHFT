import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import ProgressBar from '../components/progressBar/ProgressBar';
import Input from '../components/input/Input';
import SaveButton from '../components/saveButton/SaveButton';
import RecommedText from '../components/text/RecommedText';
import Loading from '../components/loading/Loading';
import {
  getAllIntakes,
  getGoal,
  goalIntakeFunction,
  filterData,
} from '../api/functions';
import {useQuery} from '@tanstack/react-query';
import ShareButton from '../components/share/ShareButton';
import {useAtom, useAtomValue} from 'jotai';
import {activeButtonId, goalDataId, valueAtom} from '../api/atoms';
import Error from '../components/error/Error';
import {styles} from './styles';

const GoalScreen = () => {
  const [value, setValue] = useAtom<string>(valueAtom);
  const activeButton = useAtomValue(activeButtonId);
  const [getGoalDataId, setGoalDataId] = useAtom(goalDataId);
  const goalData = useQuery({
    queryKey: ['goal', getGoalDataId],
    queryFn: () => getGoal(getGoalDataId),
  });
  const goalDataObject = goalData?.data;
  const {isLoading, error, data} = useQuery({
    queryKey: ['intakes'],
    queryFn: getAllIntakes,
  });
  console.log(data, goalData.data);
  if (isLoading || goalData.isLoading) return <Loading />;
  if (error) return <Error error={error.toString()} />;
  if (goalData.error) {
    setGoalDataId('1');
    return <Error error={goalData.error.toString()} />;
  }
  //Filtered Intake Data
  const filteredData = data && filterData(data, activeButton);
  //filtered Goal Data
  const goalIntake =
    goalDataObject && goalIntakeFunction(goalDataObject, activeButton);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.GoalScreenContainer}>
        {filteredData ? (
          <ProgressBar goalIntake={goalIntake} filteredData={filteredData} />
        ) : (
          <Loading />
        )}
        <Input value={value} setValue={setValue} />
        <SaveButton />
        {filteredData ? (
          <RecommedText filteredData={filteredData} goalIntake={goalIntake} />
        ) : (
          <Loading />
        )}
        <ShareButton />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GoalScreen;
