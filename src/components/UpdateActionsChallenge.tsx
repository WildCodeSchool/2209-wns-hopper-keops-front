import { useMutation, useQuery } from "@apollo/client";
import { readAllActions } from "../graphql/readAllActions";
import ActionCard from "./ActionCard";
import { IAction } from "../interfaces/IAction";
import { ArrowRight } from "react-bootstrap-icons";
import { useState } from "react";
import { IParticipantChallenge } from "../interfaces/IChallenge";
import { updateChallenge } from "../graphql/updateChallenge";
import { readMyChallenges } from "../graphql/readMyChallenges";
import { readOneChallenge } from "../graphql/readOneChallenge";

const ActionsChallenge = (props: {
  challenge: IParticipantChallenge,
}) => {
  const { data } = useQuery<{ readAllActions: IAction[] }>(readAllActions);

  const [actionsList, setActionsList] = useState<IAction[]>(
    props.challenge.actions || []
  );

  const [updateChallengeMutation, { error }] = useMutation(updateChallenge, {
    refetchQueries: [readMyChallenges, readOneChallenge],
  });

  const addAction = (action: IAction) => {
    setActionsList([...actionsList, { ...action }]);
  console.log("ACTIONSLIST:", actionsList);

  };

  const removeAction = (id: string) => {
    const newActionList = actionsList.filter((action) => action.id !== id);
    setActionsList(newActionList);
  console.log("ACTIONSLIST:", actionsList);

  };

  const onSubmitActionsChallenge = () => {
    try{
      //TODO:
      // updateChallengeMutation(actionsList);
    } catch(err) {
      console.log(err);
    }
  }

  console.log("DATA:", data?.readAllActions);
  
  console.log("ACTIONSLIST:", actionsList);

  return (
    <article className="challengeContainer">
      <h1>Modifie les actions de ton challenge</h1>
      {data?.readAllActions.map((action) => (
        <ActionCard
          key={action.id}
          {...action}
          isSelected={
            actionsList.find((actionListed) => actionListed.id === action.id)
              ? true
              : false
          }
          onAdd={() => addAction(action)}
          onRemove={() => removeAction(action.id)}
        />
      ))}

        <button
          disabled={actionsList.length < 1}
          onClick={() => {
            onSubmitActionsChallenge();
          }}
        >
          Enregistrer mes modifications <ArrowRight className="next-icon" />
        </button>
    </article>
  );
};

export default ActionsChallenge;
