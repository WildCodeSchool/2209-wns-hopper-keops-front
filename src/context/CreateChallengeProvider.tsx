import React, { useState } from "react";
import { IActions } from "../interfaces/IActions";
import { IChallenge } from "../interfaces/IChallenge";
import { createContext } from "react";

// export const CreateChallengeContext = createContext<IChallengeContext | null>(null);

function CreateChallengeProvider(props: { children: React.ReactNode }) {
  const [challenge, setChallenge] = useState<null | IChallenge | undefined>(
    undefined
  );
}

export default CreateChallengeProvider;
