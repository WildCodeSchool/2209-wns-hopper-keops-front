import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/AuthProvider";
import CreateChallenge from "./pages/CreateChallenge";
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
          <>
            {user ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/create-challenge" element={<CreateChallenge />} />
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
  );
}

export default App;
