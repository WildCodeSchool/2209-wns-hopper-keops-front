import { Link } from "react-router-dom";
import { useToken, useUser } from "../context/AuthProvider";

function Dashboard() {
  const userContext = useUser();
  const tokenContext = useToken();

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => tokenContext.onTokenChange(null)}>Log out</button>
      <p>Hello {userContext.email}!</p>
      <Link to="/create-challenge">
        <button> Créer un nouveau challenge !</button>
      </Link>
    </>
  );
}

export default Dashboard;
