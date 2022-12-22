import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	useMutation,
	useLazyQuery,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import { createUser } from './graphql/createUser';
import { me } from './graphql/me';
import { signin } from './graphql/signin';

interface IUser {
	email: string;
	id: string;
}

function Signin() {
	const [email, setEmail] = useState('yoyo@gmail.com');
	const [password, setPassword] = useState('123456789');
	const [token, setToken] = useState<null | String>(null);
	const [user, setUser] = useState<null | IUser>(null);

	const [wrongCredentials, setWrongCredentials] = useState(false);

	const [doSigninMutation, { data, loading, error }] = useMutation(signin);

	// Appeler la fonction me quand on veux
	const [doGetMe] = useLazyQuery(me);

	useEffect(() => {
		async function fetchMe() {
			if (token) {
				const { data } = await doGetMe({
					variables: {
						token,
					},
				});
				setUser(data.me);
			}
		}
		fetchMe();
	}, [token]);

	// useMemo useCallBack ?

	// useEffect(() => {
	// 	console.log('This is console.log of :', user);
	// }, [user]);

	async function doSignin() {
		try {
			const { data } = await doSigninMutation({
				variables: {
					email,
					password,
				},
			});
			if (data.signin) {
				// on récupère le token depuis signin.ts
				setToken(data.signin);
				setEmail('');
				setPassword('');
				setWrongCredentials(false);
			} else {
				setWrongCredentials(true);
			}
		} catch {}
	}

	return (
		<div>
			<h1>Connexion</h1>
			{user && <p>Tu es connecté.e en tant que {user.email}</p>}
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
		</div>
	);
}

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [doSignupMutation, { loading, error }] = useMutation(createUser);

	async function doSignup() {
		try {
			await doSignupMutation({
				variables: {
					data: {
						email,
						password,
					},
				},
			});
			setEmail('');
			setPassword('');
		} catch {}
	}

	return (
		<div>
			<h1>Inscription</h1>
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
			<button onClick={doSignup}>Inscription</button>
			{error && (
				<p>Il y a un problème.. Email ou mot de passe au mauvais format.</p>
			)}
		</div>
	);
}

function Main() {
	return (
		<>
			<Signup />
			<Signin />
		</>
	);
}

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Main />
		</ApolloProvider>
	);
}

export default App;
