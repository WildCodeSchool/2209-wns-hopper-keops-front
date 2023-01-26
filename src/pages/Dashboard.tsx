import { useToken, useUser } from '../context/AuthProvider';

function Dashboard() {
	const userContext = useUser();
	const tokenContext = useToken();

	return (
		<>
			<h1>Dashboard</h1>
			<p>Hello {userContext.email}!</p>
			<button onClick={() => tokenContext.onTokenChange(null)}>Log out</button>
		</>
	);
}

export default Dashboard;
