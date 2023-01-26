import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main" element={<Main />} />
      <Route path="/inscription" element={<Signup />} />
      <Route
        path="/connexion"
        element={
          <Signin
            onTokenChange={function (token: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        }
      />
    </Routes>
  );
}

export default App;
