import { useQuery } from '@apollo/client';
import React from 'react';
import { IUserChallenge } from '../interfaces/IUserChallenge';
import { readOneChallenge } from '../graphql/readOneChallenge';
import { useParams } from 'react-router-dom';

const ChallengePage = () => {
	const challengeId = useParams();
	console.log(challengeId);

	// TO DO A FAIRE POUR MERCREDI 26.

	const { data } = useQuery<{ readOneChallenge: IUserChallenge[] }>(
		readOneChallenge,
		{
			variables: {
				challengeId: `${challengeId}`,
			},
		},
	);

	console.log('Read One Challenge', data);
	return <div></div>;
};

export default ChallengePage;
