import React from 'react';
import {View} from 'react-native';
import Header from '../components/header/Header';
import ProgressBar from '../components/progressBar/ProgressBar';
import DateButton from '../components/dateButtons/DateButton';
import AddButton from '../components/addButton/AddButton';
import Sheet from '../components/bottomSheet/Sheet';
import {useQuery} from '@tanstack/react-query';
import {filterData, getAllIntakes, goalIntakeFunction} from '../api/functions';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import {getGoal} from '../api/functions';
import {useAtom, useAtomValue} from 'jotai';
import {activeButtonId, goalDataId} from '../api/atoms';
import {styles} from './styles';

const HomeScreen = () => {
  const [activeButton, setActiveButton] = useAtom<number>(activeButtonId);
  const goalId = useAtomValue(goalDataId);
  const goalData = useQuery({
    queryKey: ['goal', goalId],
    queryFn: () => getGoal(goalId),
  });
  const goalDataObject = goalData?.data;
  const {isLoading, error, data} = useQuery({
    queryKey: ['intakes'],
    queryFn: getAllIntakes,
  });
  console.log(data, goalData.data);
  //error states
  if (error) return <Error error={error.toString()} />;
  if (goalData.error) return <Error error={goalData.error.toString()} />;
  //Filtered Intake Data
  const filteredData = data && filterData(data, activeButton);
  //filtered Goal Data
  const goalIntake =
    goalDataObject && goalIntakeFunction(goalDataObject, activeButton);

  console.log(filteredData);
  console.log(goalIntake);
  return (
    <>
      <View style={styles.HomeScreenContainer}>
        <Header />
        {filteredData ? (
          <ProgressBar goalIntake={goalIntake} filteredData={filteredData} />
        ) : (
          <Loading />
        )}
        <View style={styles.HomeScreenLine} />
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
