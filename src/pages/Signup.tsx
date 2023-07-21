import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../graphql/createUser";

interface Notification {
  message: string;
  className: string;
}

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<Notification | null>(null);
  const navigate = useNavigate();

  const [doSignupMutation, { loading }] = useMutation(createUser, {
    onError: () => {      
      setNotification({ message: 'Email ou mot de passe invalide', className: 'danger'});
    },
    onCompleted: () => {
      setNotification({ message:"Inscription réussie ! 🎉 Youpi! Un.e nouveau.lle Epik'opain.e!", className: 'alert alert-popup'});
      setTimeout(() => {
        navigate('/signin');
      }, 3000); 
    },
  });

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
        {notification && <article className={`notification ${notification.className}`}><p style={{ color: notification.className === 'danger' ? 'red' : 'inherit' }}>{notification.message}</p></article>}
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

          <button onClick={doSignup} type="button" disabled={loading}>
            {loading ? 'Chargement...' : 'Inscription'}
          </button>
          <Link to="/signin">J'ai déjà un compte</Link>
        </form>
      </article>
    </>
  );
}

export default Signup;
