import { Link } from 'react-router-dom';
import './ChallengeCard.scoped.css';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { differenceInDays } from 'date-fns';
import './ChallengeCard';

const ChallengeCard = ({
	id,
	name,
	is_in_progress,
	start_date,
}: // start_date,
{
	id: string;
	name: string;
	is_in_progress: boolean;
	start_date: Date;
	// start_date: Date;
}) => {
	function calculateDaysColor() {
		if (start_date) {
			const today = new Date();

			const challengeStartDate = start_date ? new Date(start_date) : undefined;

			if (challengeStartDate) {
				const daysRemaining = differenceInDays(challengeStartDate, today);
				if (!is_in_progress && daysRemaining >= 0) {
					return 'waiting';
				} else if (!is_in_progress && daysRemaining <= 0) {
					return 'finish';
				} else {
					return 'in-progress';
				}
			}
		} else {
			console.log('La date de début du challenge est manquante.');
		}
	}

	const logoClassName = `container ${calculateDaysColor()}`;

	function calculateDaysRemaining() {
		if (start_date) {
			const today = new Date();

			const challengeStartDate = start_date ? new Date(start_date) : undefined;

			if (challengeStartDate) {
				const daysRemaining = differenceInDays(challengeStartDate, today);
				if (!is_in_progress && daysRemaining >= 0) {
					const daysRemainingLabel = daysRemaining <= 1 ? 1 : daysRemaining;
					const day = daysRemainingLabel === 1 ? 'jour' : 'jours';
					return `Patience ! Le challenge commence dans ${daysRemainingLabel} ${day}.`;
				} else if (is_in_progress && daysRemaining <= 0) {
					return 'Le challenge est en cours !';
				} else {
					return 'Le challenge est terminé.';
				}
			}
		} else {
			console.log('La date de début du challenge est manquante.');
		}
	}

	function calculateDaysLogo() {
		if (start_date) {
			const today = new Date();

			const challengeStartDate = start_date ? new Date(start_date) : undefined;

			if (challengeStartDate) {
				const daysRemaining = differenceInDays(challengeStartDate, today);
				if (!is_in_progress && daysRemaining >= 0) {
					const daysRemainingLabel = daysRemaining <= 1 ? 1 : daysRemaining;
					const day = daysRemainingLabel === 1 ? 'jour' : 'jours';
					return '⌛';
				} else if (is_in_progress && daysRemaining <= 0) {
					return '🎮';
				} else {
					return '🏁';
				}
			}
		} else {
			console.log('La date de début du challenge est manquante.');
		}
	}

	return (
		<Link to={`/challenges/${id}`} style={{ textDecoration: 'none' }}>
			<article className="grid">
				<div className="infos">
					<div className={logoClassName}>
						<p className="logo">{calculateDaysLogo()}</p>
					</div>
					<div>
						<h3 className="title">{name}</h3>
						<p>{calculateDaysRemaining()}</p>
						{/* <p>{format(start_date, 'yyyy-MM-dd')}</p> */}
					</div>
				</div>
				<div className="actions">
					<ArrowRightCircle size={28} />
				</div>
			</article>
		</Link>
	);
};

export default ChallengeCard;
