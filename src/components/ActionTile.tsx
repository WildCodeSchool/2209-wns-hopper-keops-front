import React, { useEffect, useState } from 'react';
import { IAction } from '../interfaces/IAction';
import { IChallenge } from '../interfaces/IChallenge';
import { createSuccess } from '../graphql/createSuccess';
import { useMutation, useQuery } from '@apollo/client';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { readMyChallengeSuccesses } from '../graphql/readMyChallengeSuccess';

interface ISuccess {
	id: string;
	date: string;
	action: {
		id: number;
	};
}

const ActionTile = (props: { action: IAction; challenge: IChallenge }) => {
	const startDate = new Date(props.challenge.start_date);
	const actionId = props.action.id;
	const challengeId = props.challenge.id;
	const checkboxes = [];

	const [createSuccessMutation, { error }] = useMutation(createSuccess, {
		// refetchQueries: [readMyChallenges],
	});

	const { data } = useQuery<{ readMyChallengeSuccesses: ISuccess[] }>(
		readMyChallengeSuccesses,
		{
			variables: {
				challengeId: props.challenge.id,
			},
		},
	);

	const [successesKeys, setSuccessesKeys] = useState<string[]>([]);

	useEffect(() => {
		const fetchSuccesses = async () => {
			const keys: string[] = [];

			if (data?.readMyChallengeSuccesses) {
				for (const success of data.readMyChallengeSuccesses as ISuccess[]) {
					successesKeys.push(`${success.date}-${success.action.id}`);
				}
			}
			setSuccessesKeys(keys);
		};

		fetchSuccesses();
	}, [data, successesKeys]);

	const isChecked = (i: number, actionId: string): boolean => {
		if (successesKeys.includes(`${startDate + i}-${actionId}`)) {
			return true;
		} else {
			return false;
		}
	};

	async function validateSuccess(i: number) {
		try {
			await createSuccessMutation({
				variables: {
					data: {
						action: {
							id: actionId,
						},
						challenge: {
							id: challengeId,
						},
						date: format(addDays(startDate, i), 'yyyy-MM-dd'),
					},
				},
			});
			console.log('Success with createSuccessMutation');
		} catch {
			console.log('Error with createSuccessMutation');
		}
	}

	for (let i = 0; i < props.challenge.length; i++) {
		checkboxes.push(
			<div key={i}>
				Jour {i + 1} :{' '}
				<input
					type="checkbox"
					onClick={() => validateSuccess(i)}
					defaultChecked={isChecked(i, actionId)}
				/>
			</div>,
		);
	}

	return (
		<li key={props.action.id}>
			<h6>{props.action.title}</h6>
			<div>{checkboxes}</div>
		</li>
	);
};
