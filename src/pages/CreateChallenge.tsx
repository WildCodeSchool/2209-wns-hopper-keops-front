import React, { useState } from "react";
import ActionsChallenge from "../components/ActionsChallenge";
import InitializeChallenge from "../components/InitializeChallenge";
import SubmitChallenge from "../components/SubmitChallenge";
import CreateChallengeProvider from "../context/CreateChallengeProvider";
import SuccefullCreateChallenge from "../components/SuccefullCreateChallenge";

const CreateChallenge = () => {
  const [challengeNavigation, setChallengeNavigation] = useState<string>(
    "initialize"
  );

  return (
    <CreateChallengeProvider>
      {challengeNavigation === "initialize" ? (
        <InitializeChallenge setChallengeNavigation={setChallengeNavigation} />
      ) : challengeNavigation === "actions" ? (
        <ActionsChallenge setChallengeNavigation={setChallengeNavigation} />
      ) : challengeNavigation === "invitation" ? (
        <SubmitChallenge setChallengeNavigation={setChallengeNavigation} />
      ) : challengeNavigation === "successfull" ? (
        <SuccefullCreateChallenge />
      ) : null}
    </CreateChallengeProvider>
  );
};

export default CreateChallenge;
