import format from 'date-fns/format';
import { useContext } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { IChallengeNavigation } from '../interfaces/IChallengeNavigation';

const CreateChallenge = ({ setChallengeNavigation }: IChallengeNavigation) => {
	const { challengeData, setChallengeData } = useContext(ChallengeContext);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChallengeData({
			...challengeData,
			[event.target.name]: event.target.value,
		});
	};

	// const [createChallengeMutation, { loading, error }] =
	// 	useMutation(createChallenge);

	// async function onSubmit(event: { preventDefault: () => void }) {
	// 	event.preventDefault();

	// 	try {
	// 		await createChallengeMutation({
	// 			variables: {
	// 				data: {
	// 					name,
	// 					length,
	// 					start_date: startDate,
	// 				},
	// 			},
	// 		});
	// 		setName('');
	// 		setStartDate(new Date());
	// 		setLength(0);
	// 	} catch {
	// 		console.log(error);
	// 	}
	// }

	return (
		<div>
			<h1>Commençons un nouveau challenge !</h1>
			<form>
				<div className="form-example">
					<label htmlFor="name">Nom du challenge :</label>
					<input
						type="text"
						name="name"
						value={challengeData.name}
						id="name"
						required
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-example">
					<label htmlFor="startDate">Date de début :</label>
					<input
						type="date"
						name="startDate"
						value={
							challengeData.start_date
								? format(challengeData.start_date, 'yyyy-MM-dd')
								: undefined
						}
						id="startDate"
						required
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-example">
					<label htmlFor="length">Durée prévue (en jours) :</label>
					<input
						type="number"
						name="length"
						value={challengeData.length}
						id="length"
						min="1"
						step="1"
						required
						onChange={handleInputChange}
					/>
				</div>
				{/* <div className="form-example">
						<input
							type="submit"
							value="Choisir les actions"
							onClick={onSubmit}
						/>
					</div> */}
			</form>
			<button onClick={() => setChallengeNavigation('actions')}>Actions</button>
		</div>
	);
};

export default CreateChallenge;
