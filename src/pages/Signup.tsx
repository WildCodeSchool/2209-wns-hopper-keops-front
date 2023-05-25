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
    } catch {}
  }

  return (
    <>
      <article>
        <h1 className="title">Inscription</h1>
        {error && <p className="danger">Email ou mot de passe invalide</p>}
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

          <button onClick={doSignup} type="button">
            Inscription
          </button>
          <Link to="/signin">J'ai déjà un compte</Link>
        </form>
      </article>
    </>
  );
}

export default Signup;
