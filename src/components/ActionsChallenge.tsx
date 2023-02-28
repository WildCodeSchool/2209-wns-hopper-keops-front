import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { readAllActions } from '../graphql/readAllActions';
import { IChallengeNavigation } from '../interfaces/IChallengeNavigation';
import ActionCard from './ActionCard';
import { IAction } from '../interfaces/IAction';

const ActionsChallenge = ({ setChallengeNavigation }: IChallengeNavigation) => {
	// const challengeData = useContext(ChallengeContext);

	const { data } = useQuery<{ readAllActions: IAction[] }>(readAllActions);

	const [actionsList, setActionsList] = useState<IAction['id'][]>([]);

	const addAction = (action: IAction) => {
		setActionsList([...actionsList, action.id]);
	};

	console.log('This is actionList', actionsList);

	// const addAction = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	const id = event.currentTarget.id;
	// 	setActionsList([...actionsList]);
	// 	// challengeActions.push(event.currentTarget.id);
	// 	console.log(event.currentTarget.id);
	// };

	return (
		<div className="challengeContainer">
			<h2>ActionsChallenge</h2>
			{data?.readAllActions.map(action => (
				<ActionCard
					key={action.id}
					{...action}
					onClick={() => addAction(action)}
				/>
			))}
			<button
				className="nextBtn"
				onClick={() => setChallengeNavigation('invitation')}
			>
				Actions
			</button>
		</div>
	);
};

export default ActionsChallenge;
