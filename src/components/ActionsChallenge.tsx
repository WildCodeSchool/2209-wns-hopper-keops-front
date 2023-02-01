import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { readAllActions } from '../graphql/readAllActions';
import { IChallengeNavigation } from '../interfaces/IChallengeNavigation';
import ActionCard from './ActionCard';
import { IAction } from '../interfaces/IAction';

const ActionsChallenge = ({ setChallengeNavigation }: IChallengeNavigation) => {
	const challengeData = useContext(ChallengeContext);
	console.log('this is challenge contexte :', challengeData);

	const { data } = useQuery<{ readAllActions: IAction[] }>(readAllActions);

	console.log(data);
	return (
		<div>
			<h2>ActionsChallenge</h2>
			{data?.readAllActions.map(action => (
				<ActionCard key={action.id} {...action} />
			))}
			<button onClick={() => setChallengeNavigation('invitation')}>
				Actions
			</button>
		</div>
	);
};

export default ActionsChallenge;
