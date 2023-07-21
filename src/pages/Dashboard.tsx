import { Link } from "react-router-dom";
import { IsConnectedContext, useUser } from "../context/AuthProvider";
import ChallengesList from "../components/ChallengesList";
import { PlusCircleDotted } from "react-bootstrap-icons";

import "./Dashboard.css";
import { useContext, useEffect, useState } from "react";

function Dashboard() {
  const user = useUser();
  const useIsConnectedContext = () => useContext(IsConnectedContext);
  const { isConnected, setIsConnected } = useIsConnectedContext();
  const [alerteAffichee, setAlerteAffichee] = useState(false);

  useEffect(() => {
    if (isConnected && !alerteAffichee) {
      setAlerteAffichee(true);

      setTimeout(() => {
        setIsConnected(false);
      }, 4500);
    }
  }, [isConnected, alerteAffichee, setIsConnected]);

  return (
    <>
      <div className="hero">
        {isConnected && (
          <article className="alert alert-popup">
            <p>Content de vous revoir {user.name} !</p>
          </article>
        )}
        <Link to="/create-challenge" role="button" className="createChallenge">
          <PlusCircleDotted size={34} className="previous-icon" />
          Créer un nouveau challenge !
        </Link>
        <article className="score">
          🏆 Mon score général :{" "}
          <span className="bold scoreData">{user.score} </span>
          points
        </article>
      </div>
      <hr className="separator" />
      <ChallengesList />
    </>
  );
}

export default Dashboard;
