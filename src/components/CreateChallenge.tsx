import { useMutation } from '@apollo/client';
import { Suspense, useState } from 'react';
import { createChallenge } from '../graphql/createChallenge';
import { IChallenge } from '../interfaces/IChallenge';

const CreateChallenge = () => {
	const [name, setName] = useState<IChallenge['name']>('');
	// ici peut on laisser useState() vide ?
	const [startDate, setStartDate] = useState<IChallenge['start_date']>();
	// ici peut on laisser useState() vide ?
	const [length, setLength] = useState<IChallenge['length']>();

	const [createChallengeMutation, { loading, error }] =
		useMutation(createChallenge);

	async function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();

		try {
			await createChallengeMutation({
				variables: {
					data: {
						name,
						length,
						start_date: startDate,
					},
				},
			});
			// Pourquoi setName ne se remet pas vide après l'envoie du formulaire ?
			setName('');
			// ici undefined fonctionne ?
			setStartDate(undefined);
			setLength(undefined);
		} catch {
			console.log(error);
		}
	}

	return (
		<div>
			<h1>Commençons un nouveau challenge !</h1>
			<Suspense fallback={<p>Chargement...</p>}>
				<form>
					<div className="form-example">
						<label htmlFor="name">Nom du challenge :</label>
						<input
							type="text"
							name="name"
							id="name"
							required
							disabled={loading}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="form-example">
						<label htmlFor="startDate">Date de début :</label>
						<input
							type="date"
							name="startDate"
							id="startDate"
							required
							disabled={loading}
							onChange={e => setStartDate(new Date(e.target.value))}
						/>
					</div>
					<div className="form-example">
						<label htmlFor="length">Durée prévue (en jours) :</label>
						<input
							type="number"
							name="length"
							id="length"
							min="1"
							step="1"
							required
							disabled={loading}
							onChange={e => setLength(e.target.valueAsNumber)}
						/>
					</div>
					<div className="form-example">
						<input
							type="submit"
							value="Créer le challenge"
							onClick={onSubmit}
						/>
					</div>
				</form>
			</Suspense>
		</div>
	);
};

export default CreateChallenge;
