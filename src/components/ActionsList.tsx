import { IChallenge } from '../interfaces/IChallenge';
import { IAction } from '../interfaces/IAction';
import ActionTile from './ActionTile';

const ActionsList = (props: {
  challenge: IChallenge;
  userStatus?: null | "participant" | "owner";
  toggleEditableActionsMode?: () => void;
}) => {
  return (
    <div>
      <h4>Actions:</h4>
      {props.userStatus === "owner" && (
        <button onClick={props.toggleEditableActionsMode}>
          Modifier les actions du challenge
        </button>
      )}

      <ul>
        {props.challenge.actions.map((action: IAction) => {
          return <ActionTile action={action} challenge={props.challenge} />;
        })}
      </ul>

      <button>Valider mes actions</button>
    </div>
  );
};

export default ActionsList;
