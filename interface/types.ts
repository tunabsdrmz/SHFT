export type Intakes = {
  id?: string | number | null | undefined;
  amount: number;
  unit: string;
  createdAt: string;
};

export type Goal = {
  dailyGoal: number | undefined;
  weeklyGoal: number | undefined;
  monthlyGoal: number | undefined;
  userId: string | number | undefined;
};

export type FilteredData = {
  filteredData: Intakes[];
};

export type data = {
  id: string | number | null | undefined;
  amount: string | number;
};

export type FilteredGoalData = {
  goalIntake: number | undefined;
  filteredData: Intakes[];
};
