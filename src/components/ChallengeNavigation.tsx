import { Link } from 'react-router-dom';

const ChallengeNavigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="../infos" relative="path" role="button">
						Infos
					</Link>
				</li>
				<li>
					<Link to="../tasks" relative="path" role="button">
						Taches
					</Link>
				</li>
				<li>
					<Link to="../leaderboard" relative="path" role="button">
						Classement
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default ChallengeNavigation;
