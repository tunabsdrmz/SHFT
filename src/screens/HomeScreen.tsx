import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from '../components/header/Header';
import ProgressBar from '../components/progressBar/ProgressBar';
import DateButton from '../components/dateButtons/DateButton';
import AddButton from '../components/addButton/AddButton';
import Sheet from '../components/bottomSheet/Sheet';
import {useQuery} from '@tanstack/react-query';
import {getAllIntakes} from '../api/functions';
import {Moment} from 'moment';
import moment from 'moment';
import {Intakes, Goal} from 'interface/types';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import {getGoal} from '../api/functions';
import {atom, useAtom, useAtomValue} from 'jotai';
import {activeButtonId, goalDataId} from '../api/atoms';

const HomeScreen = () => {
  const [activeButton, setActiveButton] = useAtom<number>(activeButtonId);
  const goalId = useAtomValue(goalDataId);
  const goalData = useQuery({
    queryKey: ['goal', goalId],
    queryFn: () => getGoal(goalId),
  });

  const {isLoading, error, data} = useQuery({
    queryKey: ['intakes'],
    queryFn: getAllIntakes,
  });
  //filtering goals
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
  if (goalData.error) return <Error error={goalData.error.toString()} />;
  //Filtered Intake Data
  const filteredData = data && filterData(data);

  return (
    <>
      <View style={styles.Container}>
        <Header />
        {filteredData ? (
          <ProgressBar goalIntake={goalIntake} filteredData={filteredData} />
        ) : (
          <Loading />
        )}
        <View style={styles.Line} />
        <DateButton
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
        <AddButton />
        {filteredData ? <Sheet filteredData={filteredData} /> : <Loading />}
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#DEF5FC',
  },
  Line: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderTopWidth: 1.5,
    borderRadius: 20,
    marginTop: 20,
    borderColor: '#378CA7',
  },
});
