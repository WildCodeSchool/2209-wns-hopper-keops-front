import React from 'react';
import { IAction } from '../interfaces/IAction';

const ActionTile = (props: { action: IAction; length: number }) => {
	const checkboxes = [];

	for (let i = 0; i < props.length; i++) {
		checkboxes.push(
			<div key={i}>
				Jour {i + 1} : <input type="checkbox" />
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
