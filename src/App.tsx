import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ActionsChallenge from "./components/ActionsChallenge";
import CreateChallenge from "./components/InitializeChallenge";
import InvitationChallenge from "./components/InvitationChallenge";
import { UserContext } from "./context/AuthProvider";
import CreateChallengePage from "./pages/CreateChallenge";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <>
      {user === undefined ? (
        <p>Loading...</p>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/main" element={<Main />} /> */}
          <>
            {user ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/add-challenge" element={<ActionsChallenge />} />
                <Route path="/create-challenge" element={<CreateChallenge />} />
                <Route
                  path="/submit-challenge"
                  element={<InvitationChallenge />}
                />
              </>
            ) : (
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </>
        </Routes>
      )}
    </>
    // <Routes>
    // 	<Route path="/" element={<LandingPage />} />
    // 	{user ? (
    // 		<>
    // 			<Route path="/dashboard" element={<Dashboard />} />
    // 			<Route path="*" element={<Navigate to="/dashboard" />} />
    // 		</>
    // 	) : user === null || user === undefined ? (
    // 		<>
    // 			<Route path="/signup" element={<Signup />} />
    // 			<Route path="/signin" element={<Signin />} />
    // 			<Route path="*" element={<Navigate to="/" />} />
    // 		</>
    // 	) : (
    // 		<p>Loading...</p>
    // 	)}
    // </Routes>
  );
}

export default App;
