import React from 'react'


interface IUser {
	email: string;
	id: string;
}

function Dashboard(props: {
	user: IUser;
	onTokenChange: (token?: string) => void;
}) {
	return (
		<>
			<h1>Dashboard</h1>
			<p>Hello {props.user.email}!</p>
			<button onClick={() => props.onTokenChange()}>Log out</button>
		</>
	);
}



export default Dashboard