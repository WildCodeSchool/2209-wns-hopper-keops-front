import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { ChallengeContext } from '../context/CreateChallengeProvider';
import { createChallenge } from '../graphql/createChallenge';
import { readMyChallenges } from '../graphql/readMyChallenges';
import { format, isValid } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import './SubmitChallenge.scoped.css';

type IProps = {
	setChallengeNavigation: (navigation: string) => void;
};

const SubmitChallenge = (props: IProps) => {
	const { challengeData, setChallengeData } = useContext(ChallengeContext);

	const [createChallengeMutation, { error }] = useMutation(createChallenge, {
		refetchQueries: [readMyChallenges],
	});

	async function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();

		try {
			const actionIds = challengeData.actions.map(action => ({
				id: action.id,
			}));

			const { data } = await createChallengeMutation({
				variables: {
					data: {
						actions: actionIds,
						name: challengeData.name,
						length: Number(challengeData.length),
						start_date: challengeData.start_date,
					},
				},
			});

			challengeData.id = data.createChallenge.id;
			setChallengeData({ ...challengeData });
			props.setChallengeNavigation('successfull');
		} catch {
			console.log(error);
		}
	}

	return (
		<article>
			<h1>Récapitulatif</h1>
			<section>
				<details open>
					<summary>
						<b>Infos générale</b>
					</summary>
					<ul>
						<li>Nom : {challengeData.name}</li>
						<li>
							Commencera le :{' '}
							{isValid(challengeData.start_date)
								? format(challengeData.start_date, 'yyyy/MM/dd')
								: 'Invalid Date'}
						</li>
						<li>Durera : {challengeData.length} jour(s)</li>
					</ul>
				</details>
				<details open>
					<summary>
						<b>Liste des actions</b>
					</summary>
					<ul>
						{challengeData.actions.map(action => (
							<li key={action.id}>{action.title}</li>
						))}
					</ul>
				</details>
			</section>
			<div className="container-button-multiple">
				<button
					className="nextBtn button-inline"
					onClick={() => props.setChallengeNavigation('actions')}
				>
					<ArrowLeft className="previous-icon" /> Précédent
				</button>
				<button
					data-testid="buttonCreateChallenge"
					className="nextBtn button-inline"
					type="submit"
					onClick={onSubmit}
				>
					Créer <ArrowRight className="next-icon" />
				</button>
			</div>
		</article>
	);
};

export default SubmitChallenge;
