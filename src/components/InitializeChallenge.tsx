import format from "date-fns/format";
import { useContext } from "react";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import { IChallengeNavigation } from "../interfaces/IChallengeNavigation";

const InitializeChallenge = ({
  setChallengeNavigation,
}: IChallengeNavigation) => {
  const { challengeData, setChallengeData } = useContext(ChallengeContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeData({
      ...challengeData,
      [event.target.name]: event.target.value,
    });
  };

  const isFormComplete =
    challengeData.name !== "" &&
    challengeData.start_date.toString() !== "" &&
    challengeData.length.toString() !== "";

  return (
    <div>
      <h1>Commençons un nouveau challenge !</h1>
      <form>
        <div className="form-example">
          <label htmlFor="name">Nom du challenge :</label>
          <input
            type="text"
            name="name"
            value={challengeData.name}
            id="name"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-example">
          <label htmlFor="startDate">Date de début :</label>
          <input
            type="date"
            name="startDate"
            value={
              challengeData.start_date
                ? format(challengeData.start_date, "yyyy-MM-dd")
                : undefined
            }
            id="startDate"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-example">
          <label htmlFor="length">Durée prévue (en jours) :</label>
          <input
            type="number"
            name="length"
            value={challengeData.length}
            id="length"
            min="1"
            step="1"
            required
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button
        disabled={!isFormComplete}
        onClick={() => setChallengeNavigation("actions")}
      >
        Actions
      </button>
    </div>
  );
};

export default InitializeChallenge;
