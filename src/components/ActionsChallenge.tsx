import { useQuery } from '@apollo/client';
import { readAllActions } from '../graphql/readAllActions';
import ActionCard from './ActionCard';
import { IAction } from '../interfaces/IAction';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { useContext, useState } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';

const ActionsChallenge = ({
	setChallengeNavigation,
}: {
	setChallengeNavigation: (navigation: string) => void;
}) => {
	const { data } = useQuery<{ readAllActions: IAction[] }>(readAllActions);
	const { challengeData, setChallengeData } = useContext(ChallengeContext);
	const [actionsList, setActionsList] = useState<IAction[]>(
		challengeData.actions || [],
	);

	const addAction = (action: IAction) => {
		setActionsList([...actionsList, { ...action }]);
	};

	const removeAction = (id: string) => {
		const newActionList = actionsList.filter(action => action.id !== id);
		setActionsList(newActionList);
	};

	const handleSubmit = (actionList: IAction[]) => {
		challengeData.actions = [...actionList];
		setChallengeData(challengeData);
	};

	return (
		<article className="challengeContainer">
			<h1>Choisis des actions à réaliser</h1>
			{data?.readAllActions.map(action => (
				<ActionCard
					key={action.id}
					{...action}
					isSelected={
						actionsList.find(actionListed => actionListed.id === action.id)
							? true
							: false
					}
					onAdd={() => addAction(action)}
					onRemove={() => removeAction(action.id)}
				/>
			))}
			<div className="container-button-multiple">
				<button
					className="nextBtn button-inline"
					onClick={() => {
						handleSubmit(actionsList);
						setChallengeNavigation('initialize');
					}}
				>
					<ArrowLeft className="previous-icon" /> Précédent
				</button>
				<button
					className="nextBtn button-inline"
					disabled={actionsList.length < 1}
					onClick={() => {
						handleSubmit(actionsList);
						setChallengeNavigation('invitation');
					}}
				>
					Suivant <ArrowRight className="next-icon" />
				</button>
			</div>
		</article>
	);
};

export default ActionsChallenge;
