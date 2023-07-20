import { Link } from "react-router-dom";
import React from "react";
import "./ChallengeNavigation.scoped.css";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import { PiTreeFill } from "react-icons/pi";

const ChallengeNavigation = () => {
  return (
    <div className="navigation">
      <Link to="../infos" relative="path" className="link">
        <FaSeedling className="icone-navigation" />
        <span className="text-navigation">Informations</span>
      </Link>
      <Link to="../tasks" relative="path" className="link">
        <FaLeaf className="icone-navigation" />
        <span className="text-navigation">Eco-gestes</span>
      </Link>
      <Link to="../leaderboard" relative="path" className="link">
        <PiTreeFill className="icone-navigation" />
        <span className="text-navigation">Classement</span>
      </Link>
    </div>
  );
};

export default ChallengeNavigation;
