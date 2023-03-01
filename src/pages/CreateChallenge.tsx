import React, { useState } from 'react';
import ActionsChallenge from '../components/ActionsChallenge';
import InitializeChallenge from '../components/InitializeChallenge';
import SubmitChallenge from '../components/SubmitChallenge';
import CreateChallengeProvider from '../context/CreateChallengeProvider';
import { IAction } from '../interfaces/IAction';

const CreateChallenge = () => {
	const [challengeNavigation, setChallengeNavigation] =
		useState<string>('initialize');

	const [actionsList, setActionsList] = useState<
		Array<{ id: string; title: string }>
	>([]);

	return (
		<CreateChallengeProvider>
			{challengeNavigation === 'initialize' ? (
				<InitializeChallenge setChallengeNavigation={setChallengeNavigation} />
			) : challengeNavigation === 'actions' ? (
				<ActionsChallenge
					setChallengeNavigation={setChallengeNavigation}
					setActionsList={setActionsList}
					actionsList={actionsList}
				/>
			) : challengeNavigation === 'invitation' ? (
				<SubmitChallenge actionsList={actionsList} />
			) : null}
		</CreateChallengeProvider>
	);
};

export default CreateChallenge;
