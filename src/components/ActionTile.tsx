import React from 'react';
import { IAction } from '../interfaces/IAction';
import { createSuccess } from '../graphql/createSuccess';
import { useMutation } from '@apollo/client';
import format from 'date-fns/format';

const ActionTile = (props: { action: IAction; length: number; id: string }) => {
	const checkboxes = [];
	const [createSuccessMutation, { error }] = useMutation(createSuccess, {
		// refetchQueries: [readMyChallenges],
	});

	async function validateSuccess() {
		try {
			await createSuccessMutation({
				variables: {
					data: {
						action: {
							id: props.action.id,
						},
						challenge: {
							id: props.id,
						},
						date: format(Date.now(), `yyyy-MM-${'dd' + 1}`),
					},
				},
			});
			console.log('Success with createSuccessMutation');
		} catch {
			console.log('Error with createSuccessMutation');
		}
	}

	for (let i = 0; i < props.length; i++) {
		checkboxes.push(
			<div key={i}>
				Jour {i + 1} : <input type="checkbox" onClick={validateSuccess} />
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

export default ActionTile;
