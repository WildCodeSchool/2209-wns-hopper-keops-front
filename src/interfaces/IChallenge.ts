import { IAction } from "./IAction";

export interface IChallenge {
  name: string,
  start_date: Date,
  startDate: string;
  length: number,
  actions: IAction;
  id: string,
  readAllChallenges: () => IChallenge[];
}

export interface SubmitChallengeProps {
	actionsList: Array<{ id: string; title: string }>;
}
