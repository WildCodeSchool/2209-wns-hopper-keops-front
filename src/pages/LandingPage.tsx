import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>LandingPage</h1>
      <button>
        <p>
          <Link to={`main`}> Clique</Link>
        </p>
      </button>
    </div>
  );
};

export default LandingPage;
