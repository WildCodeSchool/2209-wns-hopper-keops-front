import { useEffect, useState } from "react";
import { IChallenge } from "../interfaces/IChallenge";
import { useMutation } from "@apollo/client";
import { updateChallenge } from "../graphql/updateChallenge";
import { readMyChallenges } from "../graphql/readMyChallenges";
import { readOneChallenge } from "../graphql/readOneChallenge";
import { ArrowLeft } from "react-bootstrap-icons";

const UpdateChallenge = (props: {
  challenge: IChallenge;
  toggleEditableMode: () => void;
  toggleEditableModeAndAlert: () => void;
}) => {
  const [challenge, setChallenge] = useState(props.challenge);
  const [name, setName] = useState(props.challenge.name);
  const [length, setLength] = useState(props.challenge.length);
  const [startDate, setStartDate] = useState(props.challenge.start_date);

  const [updateChallengeMutation, { error }] = useMutation(updateChallenge, {
    refetchQueries: [readMyChallenges, readOneChallenge],
  });

  async function saveUpdatedChallenge(event: { preventDefault: () => void }) {
    event.preventDefault();

    try {
      await updateChallengeMutation({
        variables: {
          challengeId: challenge.id,
          data: {
            name: challenge.name,
            length: Number(challenge.length),
            start_date: challenge.start_date,
          },
        },
      });

      props.toggleEditableModeAndAlert();
    } catch {
      console.log(error);
    }
  }

  useEffect(() => {
    setChallenge({ ...challenge, name, length, start_date: startDate });
  }, [challenge, name, length, startDate]);

  return (
    <div>
      Name:{" "}
      <input
        type="text"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      Length:{" "}
      <input
        type="text"
        defaultValue={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      Start date:{" "}
      {/* to define date maybe use format js library, not toISOSString() */}
      <input
        type="date"
        defaultValue={new Date(startDate).toISOString().split("T")[0]}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <div className="btnContainer">
        <button className="challengeBtn" onClick={saveUpdatedChallenge}>
          Sauvegarder
        </button>
        <button
          className="outline"
          onClick={() => {
            props.toggleEditableMode();
          }}
        >
          <ArrowLeft className="next-icon" /> Annuler
        </button>
      </div>
    </div>
  );
};

export default UpdateChallenge;
