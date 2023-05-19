import axios from 'axios';
import {BASE_URL} from '@env';
import moment from 'moment';
import {Goal, Intakes, data} from 'interface/types';

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
