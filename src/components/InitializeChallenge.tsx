import { useMutation } from "@apollo/client";
import format from "date-fns/format";
import { Suspense, useState } from "react";
import { createChallenge } from "../graphql/createChallenge";
import { IChallenge } from "../interfaces/IChallenge";

const CreateChallenge = () => {
  const [name, setName] = useState<IChallenge["name"]>("");
  const [startDate, setStartDate] = useState<IChallenge["start_date"]>(
    new Date()
  );
  const [length, setLength] = useState<IChallenge["length"]>(0);

  const [createChallengeMutation, { loading, error }] =
    useMutation(createChallenge);

  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    try {
      await createChallengeMutation({
        variables: {
          data: {
            name,
            length,
            start_date: startDate,
          },
        },
      });
      setName("");
      setStartDate(new Date());
      setLength(0);
    } catch {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Commençons un nouveau challenge !</h1>
      <Suspense fallback={<p>Chargement...</p>}>
        <form>
          <div className="form-example">
            <label htmlFor="name">Nom du challenge :</label>
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              required
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-example">
            <label htmlFor="startDate">Date de début :</label>
            <input
              type="date"
              name="startDate"
              value={startDate ? format(startDate, "yyyy-MM-dd") : undefined}
              id="startDate"
              required
              disabled={loading}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div className="form-example">
            <label htmlFor="length">Durée prévue (en jours) :</label>
            <input
              type="number"
              name="length"
              value={length}
              id="length"
              min="1"
              step="1"
              required
              disabled={loading}
              onChange={(e) => setLength(e.target.valueAsNumber)}
            />
          </div>
          <div className="form-example">
            <input
              type="submit"
              value="Choisir les actions"
              onClick={onSubmit}
            />
          </div>
        </form>
      </Suspense>
    </div>
  );
};

export default CreateChallenge;
