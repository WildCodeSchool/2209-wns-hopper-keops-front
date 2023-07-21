import { IChallenge } from "../interfaces/IChallenge";
import { IAction } from "../interfaces/IAction";
import ActionTile from "./ActionTile";
import "./ActionsList.scoped.css";
import { FaPencilAlt } from "react-icons/fa";

const ActionsList = (props: {
  challenge: IChallenge;
  userStatus?: null | "participant" | "owner";
  toggleEditableActionsMode?: () => void;
}) => {
  return (
    <div>
      <section className="changeActions">
        <h2>Mes éco-gestes</h2>
        {props.userStatus === "owner" &&
          props.challenge.is_in_progress === false &&
          new Date() < new Date(props.challenge.start_date) && (
            <button
              className="challengeBtn"
              onClick={props.toggleEditableActionsMode}
            >
              <FaPencilAlt className="icone-btn" />
              <span className="text-btn">Modifier</span>
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
