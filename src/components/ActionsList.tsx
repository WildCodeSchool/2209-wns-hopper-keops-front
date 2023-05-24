import { IChallenge } from '../interfaces/IChallenge';
import { IAction } from '../interfaces/IAction';
import ActionTile from '../components/ActionTile';

const ActionsList = (props: { challenge: IChallenge }) => {
	return (
		<div>
			<h4>Actions:</h4>
			<ul>
				{props.challenge.actions.map((action: IAction) => {
					return <ActionTile action={action} length={props.challenge.length} />;
				})}
			</ul>

			<button>Valider mes actions</button>
		</div>
	);
};

export default ActionsList;
