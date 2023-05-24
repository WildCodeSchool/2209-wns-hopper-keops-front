import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import { createChallenge } from "../graphql/createChallenge";
import { IAction } from "../interfaces/IAction";
import { SubmitChallengeProps } from "../interfaces/IChallenge";

interface IChallengeData {
  name: string;
  startDate: string;
  length: number;
  start_date: Date;
  actions: IAction;
}

const SubmitChallenge = (props: SubmitChallengeProps) => {
  const dataChallenge = useContext(ChallengeContext);
  console.log(
    "this is challenge contexte bis :",
    dataChallenge.challengeData.length
  );
  console.log("this is action list", props.actionsList);

  const challengeDataArray = [dataChallenge.challengeData];

  const [createChallengeMutation, { error }] = useMutation(createChallenge);

  console.log(typeof dataChallenge.challengeData.length);

  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    try {
      const actionIds = props.actionsList.map((action) => ({ id: action.id }));

      await createChallengeMutation({
        variables: {
          data: {
            actions: actionIds,
            name: dataChallenge?.challengeData.name,
            length: Number(dataChallenge.challengeData.length),
            start_date: dataChallenge?.challengeData.startDate,
          },
        },
      });
    } catch {
      console.log(error);
    }
  }

  return (
    <div>
      <ul>
        {challengeDataArray.map((challenge: IChallengeData) => (
          <>
            <li>Nom : {challenge.name}</li>
            <li>Date de début : {challenge.startDate}</li>
            <li>Durée du challenge : {challenge.length}</li>
          </>
        ))}
      </ul>
      <ul>
        {props.actionsList.map((action) => (
          <li>{action.title}</li>
        ))}
      </ul>
      <button type="submit" onClick={onSubmit}>
        Créer
      </button>
    </div>
  );
};

export default SubmitChallenge;
