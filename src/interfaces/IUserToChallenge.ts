import { IUser } from "../interfaces/IUser";
import { IChallenge } from "../interfaces/IChallenge";

export interface IUserToChallenge {
  isAccepted?: boolean;
  challenge?: IChallenge;
  user?: IUser;
}
