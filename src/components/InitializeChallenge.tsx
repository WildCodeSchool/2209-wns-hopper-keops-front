import format from 'date-fns/format';
import { useContext } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { IChallengeNavigation } from '../interfaces/IChallengeNavigation';

const InitializeChallenge = ({
	setChallengeNavigation,
}: IChallengeNavigation) => {
	const { challengeData, setChallengeData } = useContext(ChallengeContext);

	const isFormComplete =
		challengeData.name !== '' &&
		challengeData.start_date &&
		challengeData.length;
	console.log(
		challengeData.name !== '',
		challengeData.start_date,
		challengeData.length,
	);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'start_date') {
			setChallengeData({
				...challengeData,
				start_date: new Date(event.target.value),
			});
		} else {
			setChallengeData({
				...challengeData,
				[event.target.name]: event.target.value,
			});
		}
	};

	return (
		<div>
			<h1>Commençons un nouveau challenge !</h1>
			<form>
				<div className="form-example">
					<label htmlFor="name">Nom du challenge :</label>
					<input
						type="text"
						name="name"
						data-testid="challengeName"
						value={challengeData.name}
						id="name"
						required
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-example">
					<label htmlFor="start_date">Date de début :</label>
					<input
						type="date"
						name="start_date"
						data-testid="challengeDate"
						placeholder="yyyy-MM-dd"
						value={
							challengeData.start_date
								? format(challengeData.start_date, 'yyyy-MM-dd')
								: undefined
						}
						id="start_date"
						required
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-example">
					<label htmlFor="length">Durée prévue en jours :</label>
					<input
						type="number"
						name="length"
						data-testid="challengeLength"
						value={challengeData.length}
						id="length"
						min="1"
						step="1"
						required
						onChange={handleInputChange}
					/>
				</div>
			</form>
			<button
				data-testid="challengeButton"
				disabled={!isFormComplete}
				onClick={() => setChallengeNavigation('actions')}
			>
				Actions
			</button>
		</div>
	);
};

export default InitializeChallenge;
