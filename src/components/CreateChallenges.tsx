import React, { useState } from "react";

interface IChallenge {
  onChallengeCreated: () => void;
}

const CreateChallenges = (props: IChallenge) => {
  const [challengeName, setChallengeName] = useState("");

  return (
    <div>
      <h3> Créons un nouveau challenge </h3>
    </div>
  );
};

export default CreateChallenges;
