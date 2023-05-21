import axios from 'axios';
import {BASE_URL} from '@env';
import moment, {Moment} from 'moment';
import {Goal, Intakes, data, GoalData} from 'interface/types';

export const getGoal = (id: string) => {
  return axios.get<Goal>(`${BASE_URL}/goal/${id}`).then(res => res.data);
};
//Done
export const getAllIntakes = () => {
  return axios.get<Intakes[]>(`${BASE_URL}/intake`).then(res => res.data);
};

export const getIntake = (id: number | string) => {
  return axios.get<Intakes>(`${BASE_URL}/intake/${id}`).then(res => res.data);
};

export const postIntake = (amount: number) => {
  return axios.post<Intakes>(`${BASE_URL}/intake`, {
    amount: amount,
    unit: 'ml',
    createdAt: moment(),
  });
};

export const updateIntake = ({id, amount}: data) => {
  return axios.put<Intakes>(`${BASE_URL}/intake/${id}`, {
    amount: amount,
    unit: 'ml',
    createdAt: moment(),
  });
};

export const deleteIntake = (id: number | string | undefined | null) => {
  return axios.delete(`${BASE_URL}/intake/${id}`);
};

export const filterData = (data: Intakes[], activeButton: number) => {
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

export const goalIntakeFunction = (goalData: Goal, activeButton: number) => {
  let goalIntake;
  if (activeButton === 1) {
    return (goalIntake = goalData.dailyGoal);
  } else if (activeButton === 2) {
    return (goalIntake = goalIntake = goalData.weeklyGoal);
  } else if (activeButton === 3) {
    return (goalIntake = goalIntake = goalData.monthlyGoal);
  }
};
