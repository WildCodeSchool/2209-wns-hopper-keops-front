import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { me } from '../graphql/me';
import { createContext } from 'react';

interface IUser {
	email: string;
	id: string;
}
// useContext
interface ITokenContext {
	onTokenChange: (token: string | null) => void;
}

export const TokenContext = createContext<ITokenContext | null>(null);
export const UserContext = createContext<null | IUser | undefined>(null);

function AuthProvider(props: { children: React.ReactNode }) {
	const [user, setUser] = useState<null | IUser | undefined>(undefined);

	// Verify if ther is a token + if token is with user
	const { data, refetch } = useQuery(me, {
		fetchPolicy: 'network-only',
		errorPolicy: 'ignore',
		// errorPolicy : arrivé sur le site sans token donc undefined, la requete était envoyé au back mais vu
		// qu'elle était undefined le back reçois la requête mais renvoie un message d'erreur car pas d'autorisation.
		// Il fallait ajouter errorPolicy pour demander au back de renvoyer une requête qui sera comprise
		// comme null et non comme un bloquage d'erreur undefined.
		// une fois la requête reçu par le front, elle va dans le useEffect et donne soit data.me soit null.
	});

	// on aura pas de probleme si il annule ?

	// Verify the connexion and set User state
	useEffect(() => {
		console.log('Got data:', data);
		if (data) {
			if (data.me) {
				setUser(data.me);
			} else {
				setUser(null);
			}
		}
	}, [data]);

	// receive token from a component and save it in localstorage and re exec user request 'me'
	const tokenChange = (token?: string | null) => {
		if (token) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
		}
		setUser(undefined);
		// re exec me user request
		refetch();
	};

	return (
		<UserContext.Provider value={user}>
			<TokenContext.Provider
				value={{
					onTokenChange: tokenChange,
				}}
			>
				{props.children}
			</TokenContext.Provider>
		</UserContext.Provider>
	);
}

export function useToken() {
	const ctx = useContext(TokenContext);
	if (ctx) {
		return ctx;
	} else {
		throw new Error('TokenContext undefined');
	}
}

export function useUser() {
	const ctx = useContext(UserContext);
	if (ctx) {
		return ctx;
	} else {
		throw new Error('UserContext undefined');
	}
}

export default AuthProvider;
