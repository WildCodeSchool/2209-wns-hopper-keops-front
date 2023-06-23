import { IChallenge } from '../interfaces/IChallenge';
import { IAction } from '../interfaces/IAction';
import ActionTile from './ActionTile';

const ActionsList = (props: { challenge: IChallenge }) => {
	return (
		<div>
			<h4>Actions:</h4>
			<ul>
				{props.challenge.actions.map((action: IAction) => {
					return <ActionTile action={action} challenge={props.challenge} />;
				})}
			</ul>
		</div>
	);
};

export default ActionsList;
