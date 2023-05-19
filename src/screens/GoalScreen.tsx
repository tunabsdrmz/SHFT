import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressBar from '../components/progressBar/ProgressBar';
import Input from '../components/input/Input';
import SaveButton from '../components/saveButton/SaveButton';
import RecommedText from '../components/text/RecommedText';
import Loading from '../components/loading/Loading';
import {getAllIntakes, getGoal} from '../api/functions';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShareButton from '../components/share/ShareButton';
import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';
import {activeButtonId, goalDataId, valueAtom} from '../api/atoms';
import {Intakes} from '../../interface/types';
import moment, {Moment} from 'moment';
import Error from '../components/error/Error';

const GoalScreen = () => {
  const [value, setValue] = useAtom<string>(valueAtom);
  const activeButton = useAtomValue(activeButtonId);
  const getGoalDataId = useAtomValue(goalDataId);
  const setGoalDataId = useSetAtom(goalDataId);
  const goalData = useQuery({
    queryKey: ['goal', getGoalDataId],
    queryFn: () => getGoal(getGoalDataId),
  });

  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['intakes'],
    queryFn: getAllIntakes,
  });

  let goalIntake: number | undefined;
  if (activeButton === 1) {
    goalIntake = goalData.data?.dailyGoal;
  } else if (activeButton === 2) {
    goalIntake = goalData.data?.weeklyGoal;
  } else if (activeButton === 3) {
    goalIntake = goalData.data?.monthlyGoal;
  }

  const filterData = (data: Intakes[]) => {
    let startDate: Moment;
    let endDate: Moment;
    const currentDate = moment();

    if (activeButton === 1) {
      startDate = currentDate.clone().startOf('day');
      endDate = currentDate.clone().endOf('day');
    } else if (activeButton === 2) {
      startDate = currentDate.clone().startOf('week');
      endDate = currentDate.clone().endOf('week');
    } else if (activeButton === 3) {
      startDate = currentDate.clone().startOf('month');
      endDate = currentDate.clone().endOf('month');
    }

    return data.filter(({amount, createdAt}) => {
      const itemDate = moment(createdAt);
      const amounts = amount.toString().length < 10;
      return itemDate.isBetween(startDate, endDate) && amounts;
    });
  };
  if (isLoading || goalData.isLoading) return <Loading />;
  if (error) return <Error error={error.toString()} />;
  if (goalData.error) {
    setGoalDataId('1');
    return <Error error={goalData.error.toString()} />;
  }
  //Filtered Intake Data
  const filteredData = data && filterData(data);

  return (
    <View style={styles.Container}>
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
  );
};

export default GoalScreen;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#DEF5FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
