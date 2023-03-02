import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../graphql/createUser";

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
      <Link to="/signin">J'ai déjà un compte</Link>
    </div>
  );
}

export default Signup;
