import React, { createContext, useState } from "react";
import { IChallenge } from "../interfaces/IChallenge";

interface ChallengeContextProps {
  challengeData: IChallenge;
  setChallengeData: React.Dispatch<React.SetStateAction<IChallenge>>;
}

export const ChallengeContext = createContext<ChallengeContextProps>({
  challengeData: {} as IChallenge,
  setChallengeData: () => {},
});

const CreateChallengeProvider = (props: { children: React.ReactNode }) => {
  const [challengeData, setChallengeData] = useState<IChallenge>(
    {} as IChallenge
  );

  return (
    <ChallengeContext.Provider value={{ challengeData, setChallengeData }}>
      {props.children}
    </ChallengeContext.Provider>
  );
};

export default CreateChallengeProvider;
