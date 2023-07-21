import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import "./ChallengeNavigation.scoped.css";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import { PiTreeFill } from "react-icons/pi";

const ChallengeNavigation = () => {
  const params = useParams();

  useEffect(() => {
    const links = document.querySelectorAll(".link");
    switch (params.view) {
      case "infos":
        let linkOne = links[0] as HTMLElement;
        linkOne.focus();
        break;
      case "tasks":
        let linkTwo = links[1] as HTMLElement;
        linkTwo.focus();
        break;
      case "leaderboard":
        let linkThree = links[2] as HTMLElement;
        linkThree.focus();
        break;
      default:
        break;
    }
  }, [params]);

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
