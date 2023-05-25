import { Link } from "react-router-dom";
import { useUser } from "../context/AuthProvider";
import ChallengesList from "../components/ChallengesList";
import { PlusCircleDotted } from "react-bootstrap-icons";

import "./Dashboard.css";

function Dashboard() {
  const userContext = useUser();

  return (
    <>
      <div className="hero">
        <h1 className="title">Dashboard</h1>
        <article className="alert">
          <p>Content de vous revoir {userContext.email}!</p>
        </article>
        <Link to="/create-challenge" role="button">
          <PlusCircleDotted size={34} className="previous-icon" />
          Créer un nouveau challenge !
        </Link>
      </div>
      <hr className="separator" />
      <ChallengesList />
    </>
  );
}

export default Dashboard;
