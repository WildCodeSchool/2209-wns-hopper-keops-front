import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChallengeContext } from "../context/CreateChallengeProvider";

const ActionsChallenge = () => {
  const challengeData = useContext(ChallengeContext);
  console.log("this is challenge contexte :", challengeData);
  return (
    <div>
      <h2>ActionsChallenge</h2>
      <Link to="/submit-challenge">
        <button>Valide ton challenge</button>
      </Link>
    </div>
  );
};

export default ActionsChallenge;
