import { IAction } from "./IAction";

export interface IChallenge {
  name: string,
  start_date: Date,
  length: number,
  actions: IAction;
}
