import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Main from "./pages/Main";
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
