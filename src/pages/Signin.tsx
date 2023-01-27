import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { signin } from '../graphql/signin';
import { UserContext, useToken } from '../context/AuthProvider';
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';

function Signin() {
	const tokenContext = useToken();
	const user = useContext(UserContext);

	const [email, setEmail] = useState('yoyo@gmail.com');
	const [password, setPassword] = useState('123456789');
	const [wrongCredentials, setWrongCredentials] = useState(false);

	const [doSigninMutation, { loading, error }] = useMutation(signin);

	async function doSignin() {
		try {
			const { data } = await doSigninMutation({
				variables: {
					email,
					password,
				},
			});

			if (data.signin) {
				// inform parent component there is a new token
				tokenContext.onTokenChange(data.signin);
			} else {
				setWrongCredentials(true);
			}
		} catch {}
	}

	return (
		<>
			{user ? (
				<Dashboard />
			) : (
				<div>
					<h1>Connexion</h1>
					{wrongCredentials === true && <p>Wrong credentials</p>}
					{error && (
						<pre style={{ color: 'red' }}>{JSON.stringify(error, null, 4)}</pre>
					)}
					Email :
					<input
						type="email"
						value={email}
						disabled={loading}
						onChange={e => setEmail(e.target.value)}
					/>
					Mot de passe :
					<input
						type="password"
						value={password}
						disabled={loading}
						onChange={e => setPassword(e.target.value)}
					/>
					<button onClick={doSignin}>Connexion</button>
					{error && (
						<p>Il y a un problème.. Email ou mot de passe au mauvais format.</p>
					)}
					{wrongCredentials && <p>Erreur d'identification</p>}
					<Link to="/signup"> Pas encore inscrit ? </Link>
				</div>
			)}
		</>
	);
}

export default Signin;
