import { IActions } from "./IActions";

export interface IChallenge {
  name: string,
  start_date: Date,
  length: number,
  actions: IActions;
}
