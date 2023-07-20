import { IChallenge } from "../interfaces/IChallenge";
import { IAction } from "../interfaces/IAction";
import ActionTile from "./ActionTile";
import "./ActionsList.css";
import { FaPencilAlt } from "react-icons/fa";

const ActionsList = (props: {
  challenge: IChallenge;
  userStatus?: null | "participant" | "owner";
  toggleEditableActionsMode?: () => void;
}) => {
  let iconeStyle = { fontSize: "20px", color: "white", marginRight: "10px" };

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
              <FaPencilAlt style={iconeStyle} />
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
