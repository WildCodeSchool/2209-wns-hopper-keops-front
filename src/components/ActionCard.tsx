import { IAction } from '../interfaces/IAction';

const ActionCard = (props: IAction) => {
	function addAction() {}

	return (
		<div>
			<h2>{props.title}</h2>
			<p>{props.description}</p>
			<button onClick={addAction}>Ajouter</button>
		</div>
	);
};

export default ActionCard;
