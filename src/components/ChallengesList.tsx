import { useQuery } from '@apollo/client';
import { IChallenge } from '../interfaces/IChallenge';
import { readMyChallenges } from '../graphql/readAllUserChallenges';
import ChallengeCard from './ChallengeCard';

const ChallengesList = () => {
	const { data } = useQuery<{ readMyChallenges: IChallenge[] }>(
		readMyChallenges,
	);

	const viewDetails = () => {};

	console.log('All challenges dashboard', data);

	return (
		<div>
			<p>Ici les challenges</p>
			{data?.readMyChallenges.map(challenge => (
				<ChallengeCard
					key={challenge.id}
					{...challenge}
					onClick={() => viewDetails}
				/>
			))}
		</div>
	);
};

export default ChallengesList;
