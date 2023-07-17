import { Link } from "react-router-dom";
import { UserContext, useToken } from "../context/AuthProvider";
import { useContext } from "react";
import logo from "../logoEpikEco.png";
import "./Header.css";
import { useState } from 'react';

const Header = () => {
  const user = useContext(UserContext);
  const tokenContext = useToken();
  const [showNotification, setShowNotification] = useState(false);

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <nav className="container">
      <ul>
        <li>
          <Link to="/" className="brand">
            <img src={logo} alt="logo Epik'Eco" />
          </Link>
        </li>
      </ul>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profil">Profil</Link>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  tokenContext.onTokenChange(null);
                  setShowNotification(true);
                  setTimeout(hideNotification, 3000);
                }}
              >
                Déconnexion
              </a>
            </li>
          </>
        ) : (
          <li>
            <Link to="/signin" role="button" className="outline">
              Connexion
            </Link>
          </li>
        )}
      </ul>
      {showNotification && (
        <article className="info alert-popup">
          A bientôt Epikopain(e)!
        </article>
      )}
    </nav>
  );
};

export default Header;
