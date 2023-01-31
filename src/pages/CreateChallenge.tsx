import React, { useState } from "react";
import ActionsChallenge from "../components/ActionsChallenge";
import InitializeChallenge from "../components/InitializeChallenge";
import InvitationChallenge from "../components/InvitationChallenge";
import CreateChallengeProvider from "../context/CreateChallengeProvider";

const CreateChallengePage = () => {
  const [challengeNavigation, setChallengeNavigation] = useState("initialize");
  return (
    <div>
      <CreateChallengeProvider>
		{
			challengeNavigation ==="initialize" ? (
				<InitializeChallenge />
			) ? challengeNavigation ==="actions" (
				<ActionsChallenge />
			) ? challengeNavigation ==="invitation" (
			<InvitationChallenge />
			) : null
		}  
      </CreateChallengeProvider>
    </div>
  );
};

export default CreateChallengePage;
