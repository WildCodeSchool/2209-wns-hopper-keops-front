import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';
import Dashboard from './Dashboard';
import Signin from './Signin';

function Main() {
	const user = useContext(UserContext);
	return (
		<>
			{user ? (
				<Dashboard />
			) : user === null ? (
				<>
					<Signin />
					<Link to="/inscription"> Pas encore inscrit ? </Link>
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

export default Main;
