import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { readAllActions } from '../graphql/readAllActions';
import { IChallengeNavigation } from '../interfaces/IChallengeNavigation';
import ActionCard from './ActionCard';
import { IAction } from '../interfaces/IAction';

const ActionsChallenge = ({
	setChallengeNavigation,
	setActionsList,
	actionsList,
}: {
	setChallengeNavigation: (navigation: string) => void;
	setActionsList: (actions: Array<{ id: string; title: string }>) => void;
	actionsList: Array<{ id: string; title: string }>;
}) => {
	// const challengeData = useContext(ChallengeContext);

	const { data } = useQuery<{ readAllActions: IAction[] }>(readAllActions);

	const addAction = (action: IAction) => {
		setActionsList([...actionsList, { id: action.id, title: action.title }]);
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
