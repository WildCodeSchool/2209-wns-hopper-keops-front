import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
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

function Signin(props: { onTokenChange: (token: string) => void }) {
  const [email, setEmail] = useState("yoyo@gmail.com");
  const [password, setPassword] = useState("123456789");
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
        // inform parent component there is a new token
        props.onTokenChange(data.signin);
      } else {
        setWrongCredentials(true);
      }
    } catch {}
  }

  return (
    <div>
      <h1>Connexion</h1>
      {wrongCredentials === true && <p>Wrong credentials</p>}
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
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

function Main() {
  const [user, setUser] = useState<null | IUser | undefined>(undefined);

  // Verify if ther is a token + if token is with user
  const { data, refetch } = useQuery(me);

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

  // receive token from a component and save it in localstorage and re exec user request 'me'
  const onTokenChange = (token?: string) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    // re exec me user request
    refetch();
  };

  return (
    <>
      {user ? (
        <Dashboard user={user} onTokenChange={onTokenChange} />
      ) : user === null ? (
        <>
          <Signup />
          <Signin onTokenChange={onTokenChange} />
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

// 34.46
