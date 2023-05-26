import format from "date-fns/format";
import { useContext, useEffect, useState } from "react";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import { IChallengeNavigation } from "../interfaces/IChallengeNavigation";
import { ArrowRight } from "react-bootstrap-icons";

const InitializeChallenge = ({
  setChallengeNavigation,
}: IChallengeNavigation) => {
  const { challengeData, setChallengeData } = useContext(ChallengeContext);

  const [name, setName] = useState(challengeData.name || "");
  const [startDate, setStartDate] = useState(
    challengeData.start_date || new Date()
  );
  const [length, setLength] = useState(challengeData.length || 1);
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    if (name !== "" && startDate && length) {
      setIsFormComplete(true);
    }
  }, [name, startDate, length]);

  const handleSubmit = () => {
    challengeData.name = name;
    challengeData.start_date = startDate;
    challengeData.length = length;
    setChallengeData({ ...challengeData });
    setChallengeNavigation("actions");
  };

  return (
    <article>
      <h1>Commençons un nouveau challenge !</h1>
      <form>
        <div className="form-example">
          <label htmlFor="name">Nom du challenge :</label>
          <input
            type="text"
            name="name"
            data-testid="challengeName"
            placeholder="Choisis un super nom"
            value={name}
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid">
          <div>
            <label htmlFor="start_date">Date de début :</label>
            <input
              type="date"
              name="start_date"
              min={format(new Date(), "yyyy-MM-dd")}
              data-testid="challengeDate"
              placeholder="yyyy-mm-dd"
              value={format(startDate, "yyyy-MM-dd")}
              id="start_date"
              required
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="length">Durée prévue en jours :</label>
            <input
              type="number"
              name="length"
              data-testid="challengeLength"
              placeholder="Nombre de jour du challenge"
              value={length}
              id="length"
              min="1"
              step="1"
              required
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
        </div>
      </form>
      <div className="container-button-alone">
        <button
          className="button-inline"
          data-testid="challengeButton"
          disabled={!isFormComplete}
          onClick={() => handleSubmit()}
        >
          Suivant <ArrowRight className="next-icon" />
        </button>
      </div>
    </article>
  );
};

export default InitializeChallenge;
