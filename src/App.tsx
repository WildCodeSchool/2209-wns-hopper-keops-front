import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
  useLazyQuery,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react";
import { createUser } from "./graphql/createUser";
import { me } from "./graphql/me";
import { signin } from "./graphql/signin";

interface IUser {
  email: string;
  id: string;
}

function Signin() {
  const [email, setEmail] = useState("yoyo@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [token, setToken] = useState<null | String>(null);
  const [user, setUser] = useState<null | IUser>(null);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  //absent dans vidéo P2 14:39
  const [doSigninMutation, { loading, error }] = useMutation(signin);

  async function doSignin() {
    try {
      const { data } = await doSigninMutation({
        variables: {
          email,
          password,
        },
        refetchQueries: [me],
      });
      if (data.signin) {
        // on récupère le token depuis signin.ts
        setToken(data.signin);
        localStorage.setItem("token", data.signin);
        setEmail("");
        setPassword("");
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
        onChange={(e) => setEmail(e.target.value)}
      />
      Mot de passe :
      <input
        type="password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      setEmail("");
      setPassword("");
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
        onChange={(e) => setEmail(e.target.value)}
      />
      Mot de passe :
      <input
        type="password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={doSignup}>Inscription</button>
      {error && (
        <p>Il y a un problème.. Email ou mot de passe au mauvais format.</p>
      )}
    </div>
  );
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function Main() {
  const [user, setUser] = useState<null | IUser | undefined>(undefined);

  // Verify if ther is a token + if token is with user
  const { data } = useQuery(me);

  // Verify the connexion and set User state
  useEffect(() => {
    console.log("Got data:", data);
    if (data) {
      if (data.me) {
        setUser(data.me);
      } else {
        setUser(null);
      }
    }
  }, [data]);

  return (
    <>
      {user ? (
        <Dashboard />
      ) : user === null ? (
        <>
          <Signup />
          <Signin />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

// uri = api
const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

// give token to the request header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
