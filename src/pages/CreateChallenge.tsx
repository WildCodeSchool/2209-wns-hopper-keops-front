import React from 'react';
import InitializeChallenge from '../components/InitializeChallenge';
import CreateChallengeProvider from '../context/CreateChallengeProvider';

const CreateChallengePage = () => {
	return (
		<div>
			<CreateChallengeProvider>
				<InitializeChallenge />
			</CreateChallengeProvider>
		</div>
	);
};

export default CreateChallengePage;
