import { IAction } from "./IAction";
import { IUser } from "./IUser";

export interface IChallenge {
  name: string;
  start_date: Date;
  startDate: string;
  end_date: Date;
  length: number;
  actions: IAction[];
  id: string;
  is_in_progress: boolean;
  readMyChallenges: () => IChallenge[];
}

export interface IParticipantChallenge extends IChallenge {
  userToChallenges: { id: string; user: IUser }[];
  createdBy: IUser;
}

export interface SubmitChallenge {
  actionsList: Array<{ id: string; title: string }>;
}
