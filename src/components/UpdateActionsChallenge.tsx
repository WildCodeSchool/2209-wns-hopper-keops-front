import { useMutation, useQuery } from "@apollo/client";
import { readAllActions } from "../graphql/readAllActions";
import ActionCard from "./ActionCard";
import { IAction } from "../interfaces/IAction";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useState } from "react";
import { IParticipantChallenge } from "../interfaces/IChallenge";
import { readOneChallenge } from "../graphql/readOneChallenge";
import { updateActionToChallenge } from "../graphql/updateActionToCHallenge";

const ActionsChallenge = (props: {
  challenge: IParticipantChallenge,
  toggleEditableActionsMode: () => void;
  toggleEditableActionsModeAndAlert: () => void;
}) => {
  const { data } = useQuery<{ readAllActions: IAction[] }>(readAllActions);

  const [actionsList, setActionsList] = useState<IAction[]>(
    props.challenge.actions || []
  );

  const [doUpdateActionToChallengeMutation] = useMutation<IAction[]>(updateActionToChallenge, {
    refetchQueries: [readOneChallenge],
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
      const actionsIdsArray = actionsList.map((action) => ({id: action.id}));

      console.log("actionsIdsArray", actionsIdsArray);
      

      doUpdateActionToChallengeMutation({variables: {
        data: {
          actions: actionsIdsArray
        },
        challengeId: props.challenge.id
      }});

      props.toggleEditableActionsModeAndAlert();
    } catch(err) {
      console.log(err);
    }
  }

  console.log("DATA:", data?.readAllActions);
  
  console.log("ACTIONSLIST:", actionsList);

  return (
    <div className="challengeContainer updateActions">
      <h2>Modifie les actions de ton challenge</h2>
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
      <div className="btnContainer">
        <button
        className="challengeBtn updateChallengeBtn"
          disabled={actionsList.length < 1}
          onClick={() => {
            onSubmitActionsChallenge();
          }}
        >
          Enregistrer mes modifications <ArrowRight className="next-icon" />
        </button>

        <button
          className="outline"
          onClick={() => {
            props.toggleEditableActionsMode();
          }}
        >
          <ArrowLeft className="next-icon" /> Annuler
        </button>
    </div>
    </div>
  );
};

export default ActionsChallenge;
