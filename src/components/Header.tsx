import { Link } from "react-router-dom";
import { UserContext, useToken } from "../context/AuthProvider";
import { useContext } from "react";
import logo from "../logoEpikEco.png";
import "./Header.css";

const Header = () => {
  const user = useContext(UserContext);
  const tokenContext = useToken();

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
    </nav>
  );
};

export default Header;
