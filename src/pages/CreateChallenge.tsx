import React, { useState } from 'react';
import ActionsChallenge from '../components/ActionsChallenge';
import InitializeChallenge from '../components/InitializeChallenge';
import SubmitChallenge from '../components/SubmitChallenge';
import CreateChallengeProvider from '../context/CreateChallengeProvider';

const CreateChallenge = () => {
	const [challengeNavigation, setChallengeNavigation] =
		useState<string>('initialize');

	return (
		<CreateChallengeProvider>
			{challengeNavigation === 'initialize' ? (
				<InitializeChallenge setChallengeNavigation={setChallengeNavigation} />
			) : challengeNavigation === 'actions' ? (
				<ActionsChallenge setChallengeNavigation={setChallengeNavigation} />
			) : challengeNavigation === 'invitation' ? (
				<SubmitChallenge />
			) : null}
		</CreateChallengeProvider>
	);
};

export default CreateChallenge;
