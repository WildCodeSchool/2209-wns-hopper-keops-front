import React, { useState } from 'react';
import ActionsChallenge from '../components/ActionsChallenge';
import InitializeChallenge from '../components/InitializeChallenge';
import InvitationChallenge from '../components/InvitationChallenge';
import CreateChallengeProvider from '../context/CreateChallengeProvider';

const CreateChallenge = () => {
	const [challengeNavigation, setChallengeNavigation] =
		useState<string>('initialize');

	return (
		<CreateChallengeProvider>
			{challengeNavigation === 'initialize' ? (
				<InitializeChallenge setChallengeNavigation={setChallengeNavigation} />
			) : challengeNavigation === 'actions' ? (
				<ActionsChallenge />
			) : challengeNavigation === 'invitation' ? (
				<InvitationChallenge />
			) : null}
		</CreateChallengeProvider>
	);
};

export default CreateChallenge;
