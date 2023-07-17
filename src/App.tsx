import { useContext } from "react";
import "@picocss/pico";
import "./styles/theme.css";
import "./styles/alert.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/AuthProvider";
import CreateChallenge from "./pages/CreateChallenge";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ChallengePage from "./pages/ChallengePage";
import Header from "./components/Header";
import Profil from "./pages/Profil";
import ChallengeLeaderboardPage from "./pages/ChallengeLeaderboardPage";
import Footer from "./components/Footer";

function App() {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <>
      <Header />
      {user === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <>
                {user ? (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/create-challenge"
                      element={<CreateChallenge />}
                    />
                    <Route
                      path="/challenges/:challengeId"
                      element={<ChallengePage />}
                    />
                    <Route path="/profil" element={<Profil />} />
                    <Route
                      path="/challenges/:challengeId/leaderboard"
                      element={<ChallengeLeaderboardPage />}
                    />

                    <Route path="*" element={<Navigate to="/dashboard" />} />
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
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
