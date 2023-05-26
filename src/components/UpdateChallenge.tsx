import { useEffect, useState } from "react";
import { IChallenge } from "../interfaces/IChallenge";

const UpdateChallenge = (props: { challenge: IChallenge }) => {
  const [challenge, setChallenge] = useState(props.challenge);
  const [name, setName] = useState(props.challenge.name);
  const [length, setLength] = useState(props.challenge.length);
  const [startDate, setStartDate] = useState(props.challenge.start_date);

  const saveUpdatedChallenge = () => {
    // setChallenge({ ...challenge, name: "Blabla" });
    console.log(challenge);
  };

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
      <button onClick={saveUpdatedChallenge}>Sauvegarder</button>
    </div>
  );
};

export default UpdateChallenge;
