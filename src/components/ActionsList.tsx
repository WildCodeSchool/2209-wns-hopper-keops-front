import { IChallenge } from "../interfaces/IChallenge";
import { IAction } from "../interfaces/IAction";
import ActionTile from "./ActionTile";
import "./ActionsList.css";

const ActionsList = (props: {
  challenge: IChallenge;
  userStatus?: null | "participant" | "owner";
  toggleEditableActionsMode?: () => void;
}) => {
  return (
    <div>
      <section className="changeActions">
        <h4>Mes éco-gestes</h4>
        {props.userStatus === "owner" &&
          props.challenge.is_in_progress === false && (
            <button
              className="challengeBtn"
              onClick={props.toggleEditableActionsMode}
            >
              Modifier
            </button>
          )}
      </section>
      <ul>
        {props.challenge.actions.map((action: IAction) => {
          return <ActionTile action={action} challenge={props.challenge} />;
        })}
      </ul>
    </div>
  );
};

export default ActionsList;
