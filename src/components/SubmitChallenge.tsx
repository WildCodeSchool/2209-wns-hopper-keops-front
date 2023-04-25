import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { createChallenge } from '../graphql/createChallenge';
import { IAction } from '../interfaces/IAction';
import { SubmitChallengeProps } from '../interfaces/IChallenge';

import format from 'date-fns/format';

interface IChallengeData {
	name: string;
	startDate: string;
	length: number;
	start_date: Date;
	actions: IAction;
}

const SubmitChallenge = (props: SubmitChallengeProps) => {
	const dataChallenge = useContext(ChallengeContext);
	console.log(
		'this is challenge contexte bis :',
		dataChallenge.challengeData.length,
	);
	console.log('this is action list', props.actionsList);

	console.log('Challenge with new team:', dataChallenge.challengeData);

	console.log(
		'Start date with new team:',
		format(dataChallenge.challengeData.start_date, 'yyyy-MM-dd'),
	);

	const challengeDataArray = [dataChallenge.challengeData];

	console.log('This is challengeDataArray', challengeDataArray);

	const [createChallengeMutation, { error }] = useMutation(createChallenge);

	console.log(typeof dataChallenge.challengeData.length);

	async function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();

		try {
			const actionIds = props.actionsList.map(action => ({ id: action.id }));

			await createChallengeMutation({
				variables: {
					data: {
						actions: actionIds,
						name: dataChallenge?.challengeData.name,
						length: Number(dataChallenge.challengeData.length),
						start_date: dataChallenge?.challengeData.start_date,
					},
				},
			});
		} catch {
			console.log(error);
		}
	}

	return (
		<div>
			<ul>
				{challengeDataArray.map((challenge: IChallengeData) => (
					<>
						<li>Nom : {challenge.name}</li>
						<li>
							Date de début : {format(challenge.start_date, 'yyyy-MM-dd')}
						</li>
						<li>Durée du challenge : {challenge.length}</li>
					</>
				))}
			</ul>
			<ul>
				{props.actionsList.map(action => (
					<li>{action.title}</li>
				))}
			</ul>
			<button type="submit" onClick={onSubmit}>
				Créer
			</button>
		</div>
	);
};

export default SubmitChallenge;
