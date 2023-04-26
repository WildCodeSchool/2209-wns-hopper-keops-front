import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { IParticipantChallenge } from '../interfaces/IChallenge';
import { IUser } from '../interfaces/IUser';
import { IAction } from '../interfaces/IAction';
import { readOneChallenge } from '../graphql/readOneChallenge';
import { Navigate, useParams } from 'react-router-dom';

import format from 'date-fns/format';
import { createUserToChallenge } from '../graphql/createUserToChallenge';

const ChallengePage = () => {
	const { challengeId } = useParams();

	const [challenge, setChallenge] = useState<null | IParticipantChallenge | undefined>(undefined);
	const [createUserToChallengeMutation, { error }] = useMutation(createUserToChallenge);

	const { data } = useQuery<{ readOneChallenge: IParticipantChallenge }>(
		readOneChallenge,
		{
			variables: {
				challengeId,
			},
		},
	);

	useEffect(() => {
		if (data) { setChallenge(data?.readOneChallenge) };
		console.log("DATA users:", data);
	}, [data])

	function shareChallenge() {
		let url = document.location.href

		navigator.clipboard.writeText(url).then(function() {
				console.log('Copied!');
		}, function() {
				console.log('Copy error')
		});
	}
	
	const participateToChallenge = async () => {
		try {
			await createUserToChallengeMutation({
				variables: {
					// isAccepted: true,
					challengeId,
				},
			});

			console.log("Participation OK");
		} catch {
			console.log('error :',error);
		}
	}

	if (challenge === null) {
		return <Navigate to={'/dashboard'} replace={true} />;
	} else if (challenge !== undefined && challenge !== null) {
		return <div>
			<h2>{challenge.name}</h2>
			{<p>Date de début: {format(new Date(challenge.start_date), 'yyyy-MM-dd')}</p>}
			<p>Durée : {challenge.length}</p>
			<p>Créé par : {challenge.createdBy.id}</p>

			<button onClick={shareChallenge}>Partager ce challenge</button>
			<button onClick={participateToChallenge}>Je participe !</button>


			<h4>Participants:</h4>
			<li>
				{challenge.userToChallenges.map((participant: {user: IUser}) => {
					return <p key={participant.user.id}>{participant.user.name}</p>;
				})}
			</li>

			<h4>Actions:</h4>
			<li>{challenge.actions.map((action: IAction) => {
					return <p key={action.id}>{action.title}</p>;
				})}</li>
		</div>;
	} else {
		return <div>Loading...</div>
	}
};

export default ChallengePage;
