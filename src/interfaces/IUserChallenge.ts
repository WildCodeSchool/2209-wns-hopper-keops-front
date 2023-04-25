import { IAction } from "./IAction";
import { IUser } from "./IUser";

export interface IUserChallenge {
  actions: IAction[];
  end_date: Date;
  id: string;
  is_in_progress: boolean;
  length: number;
  name: string;
  start_date: Date;
  createdBy: IUser;
  userToChallenges: {user: IUser[]};
}
