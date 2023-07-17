import { Link } from "react-router-dom";
import { UserContext, useToken } from "../context/AuthProvider";
import { useContext } from "react";
import logo from "../logoEpikEco.png";
import "./Header.scoped.css";
import { useState } from "react";
import { BoxArrowRight, Person, Speedometer2 } from "react-bootstrap-icons";

const Header = () => {
  const user = useContext(UserContext);
  const tokenContext = useToken();
  const [showNotification, setShowNotification] = useState(false);

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <nav className="container">
      <ul className="brand-container">
        <li>
          <Link to="/" className="brand">
            <img src={logo} alt="logo Epik'Eco" />
          </Link>
        </li>
      </ul>
      <ul className="navigation">
        {user ? (
          <>
            <li>
              <Link to="/dashboard" className="item">
                <Speedometer2 className="icone-navigation" />
                <span className="text-navigation">Challenges</span>
              </Link>
            </li>
            <li>
              <Link to="/profil" className="item">
                <Person className="icone-navigation" />
                <span className="text-navigation">Compte</span>
              </Link>
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
                className="item"
              >
                <BoxArrowRight className="icone-navigation" />
                <span className="text-navigation">Déconnexion</span>
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
        <article className="info alert-popup">A bientôt Epikopain(e)!</article>
      )}
    </nav>
  );
};

export default Header;
