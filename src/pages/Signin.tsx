import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { signin } from "../graphql/signin";
import {
  IsConnectedContext,
  UserContext,
  useToken,
} from "../context/AuthProvider";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

function Signin() {
  const tokenContext = useToken();
  const user = useContext(UserContext);
  const useIsConnectedContext = () => useContext(IsConnectedContext);
  const { setIsConnected } = useIsConnectedContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        setIsConnected(true);
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
        <>
          <article>
            <h1 className="title">Connexion</h1>
            {wrongCredentials === true && (
              <p className="danger">Email ou mot de passe invalide !</p>
            )}
            {error && (
              <pre style={{ color: "red" }}>
                {JSON.stringify(error, null, 4)}
              </pre>
            )}
            <form>
              <label>Email :</label>
              <input
                type="email"
                placeholder="Ton email"
                required
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Mot de passe :</label>
              <input
                type="password"
                placeholder="Ton mot de passe"
                required
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={doSignin} type="button">
                Connexion
              </button>
              <Link to="/signup"> Pas encore inscrit ?</Link>
            </form>
          </article>
        </>
      )}
    </>
  );
}

export default Signin;
