import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import { readAllActions } from "../graphql/readAllActions";
import { IChallengeNavigation } from "../interfaces/IChallengeNavigation";
import ActionCard from "./ActionCard";
import { IAction } from "../interfaces/IAction";

const ActionsChallenge = ({ setChallengeNavigation }: IChallengeNavigation) => {
  const challengeData = useContext(ChallengeContext);
  console.log("this is challenge contexte :", challengeData);

  const { data } = useQuery<{ readAllActions: IAction[] }>(readAllActions);
  console.log(data);

  const [actionsList, setActionsList] = useState<IAction["id"][]>([]);
  const [challengeActions, setChallengeActions] = useState<string[]>([]);
  const addAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setActionsList([...actionsList]);
    // challengeActions.push(event.currentTarget.id);
    console.log(event.currentTarget.id);
  };
  return (
    <div>
      <h2>ActionsChallenge</h2>
      {data?.readAllActions.map((action) => (
        <ActionCard key={action.id} {...action} />
      ))}
      <button onClick={() => setChallengeNavigation("invitation")}>
        Actions
      </button>
    </div>
  );
};

export default ActionsChallenge;
