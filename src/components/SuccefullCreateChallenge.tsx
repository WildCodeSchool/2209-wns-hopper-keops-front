import { useContext, useState } from "react";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import {
  ArrowRight,
  FileEarmark,
  FileEarmarkCheckFill,
} from "react-bootstrap-icons";
import "./SuccefullCreateChallenge.scoped.css";
import { Link } from "react-router-dom";

const SuccefullCreateChallenge = () => {
  const { challengeData } = useContext(ChallengeContext);

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyInput = () => {
    navigator.clipboard
      .writeText(`localhost:3000/challenges/${challengeData.id}`)
      .then(
        () => {
          setIsCopied(true);
        },
        () => {
          console.log("oups");
        }
      );
  };

  return (
    <article>
      <h1>Invite tes potes !</h1>
      <article className="alert">
        <p>
          Bravo ton challenge à été créé 🚀 <br />
          Invite tes amis à participer en partageant le lien ci-dessous.
        </p>
      </article>
      <div className="share-input">
        <input
          type="url"
          value={`localhost:3000/challenges/${challengeData.id}`}
          readOnly
        />
        {isCopied ? (
          <FileEarmarkCheckFill
            type="button"
            size={34}
            className="primary button-icon"
            onClick={copyInput}
          />
        ) : (
          <FileEarmark
            type="button"
            size={34}
            className="primary button-icon"
            onClick={copyInput}
          />
        )}
      </div>
      <div className="container-button-alone">
        <Link
          to={`/challenges/${challengeData.id}`}
          className="nextBtn outline"
          role="button"
        >
          Voir le challenge <ArrowRight className="next-icon" />
        </Link>
      </div>
    </article>
  );
};

export default SuccefullCreateChallenge;
