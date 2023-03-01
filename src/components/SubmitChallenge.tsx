import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { createChallenge } from '../graphql/createChallenge';
import { IAction } from '../interfaces/IAction';
import { SubmitChallengeProps } from '../interfaces/IChallenge';

interface IChallengeData {
	name: string;
	startDate: string;
	length: number;
	start_date: Date;
	actions: IAction;
}

const SubmitChallenge = (props: SubmitChallengeProps) => {
	const dataChallenge = useContext(ChallengeContext);
	console.log('this is challenge contexte bis :', dataChallenge);
	console.log('this is action list', props.actionsList);

	const challengeDataArray = [dataChallenge.challengeData];

	// const [createChallengeMutation, { loading, error }] =
	// useMutation(createChallenge);

	// async function onSubmit(event: { preventDefault: () => void }) {
	// event.preventDefault();

	// try {
	// 	await createChallengeMutation({
	// 		variables: {
	// 			data: {
	// 				name,
	// 				length,
	// 				start_date: startDate,
	// 			},
	// 		},
	// 	});
	// 	setName('');
	// 	setStartDate(new Date());
	// 	setLength(0);
	// } catch {
	// 	console.log(error);
	// }
	// }
	// challengeData

	return (
		<div>
			<ul>
				{challengeDataArray.map((challenge: IChallengeData) => (
					<>
						<li>Nom : {challenge.name}</li>
						<li>Date de début : {challenge.startDate}</li>
						<li>Durée du challenge : {challenge.length}</li>
					</>
				))}
			</ul>
			<ul>
				{props.actionsList.map(action => (
					<li>{action.title}</li>
				))}
			</ul>
		</div>
	);
};

export default SubmitChallenge;
