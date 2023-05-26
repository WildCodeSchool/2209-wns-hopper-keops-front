import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import { createChallenge } from "../graphql/createChallenge";
import { useNavigate } from "react-router-dom";
import { readMyChallenges } from "../graphql/readMyChallenges";
import format from "date-fns/format";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

type IProps = {
  setChallengeNavigation: (navigation: string) => void;
};

const SubmitChallenge = (props: IProps) => {
  const navigate = useNavigate();
  const { challengeData } = useContext(ChallengeContext);

  const [createChallengeMutation, { error }] = useMutation(createChallenge, {
    refetchQueries: [readMyChallenges],
  });

  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    try {
      const actionIds = challengeData.actions.map((action) => ({
        id: action.id,
      }));

      await createChallengeMutation({
        variables: {
          data: {
            actions: actionIds,
            name: challengeData.name,
            length: Number(challengeData.length),
            start_date: challengeData.start_date,
          },
        },
      });
      navigate("/dashboard", { replace: true });
    } catch {
      console.log(error);
    }
  }

  return (
    <article>
      <h1>Récapitulatif</h1>
      <details open>
        <summary>Infos générale</summary>
        <ul>
          <li>Nom : {challengeData.name}</li>
          <li>
            Date de début : {format(challengeData.start_date, "yyyy-MM-dd")}
          </li>
          <li>Durée du challenge : {challengeData.length}</li>
        </ul>
      </details>
      <details open>
        <summary>Liste des actions</summary>
        <ul>
          {challengeData.actions.map((action) => (
            <li key={action.id}>{action.title}</li>
          ))}
        </ul>
      </details>
      <div className="container-button-multiple">
        <button
          className="nextBtn button-inline"
          onClick={() => props.setChallengeNavigation("actions")}
        >
          <ArrowLeft className="previous-icon" /> Précédent
        </button>
        <button
          className="nextBtn button-inline"
          type="submit"
          onClick={onSubmit}
        >
          Créer <ArrowRight className="next-icon" />
        </button>
      </div>
    </article>
  );
};

export default SubmitChallenge;
