import { useMutation } from "@apollo/client";
import format from "date-fns/format";
import { Suspense, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ChallengeContext } from "../context/CreateChallengeProvider";
import { createChallenge } from "../graphql/createChallenge";
import { IChallenge } from "../interfaces/IChallenge";

const CreateChallenge = () => {
  //   const [name, setName] = useState<IChallenge['name']>('');
  // const [startDate, setStartDate] = useState<IChallenge['start_date']>(
  // 	new Date(),
  // );
  // const [length, setLength] = useState<IChallenge['length']>(0);

  const { challengeData, setChallengeData } = useContext(ChallengeContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeData({
      ...challengeData,
      [event.target.name]: event.target.value,
    });
  };

  // const [createChallengeMutation, { loading, error }] =
  // 	useMutation(createChallenge);

  // async function onSubmit(event: { preventDefault: () => void }) {
  // 	event.preventDefault();

  // 	try {
  // 		await createChallengeMutation({
  // 			variables: {
  // 				data: {
  // 					name,
  // 					length,
  // 					start_date: startDate,
  // 				},
  // 			},
  // 		});
  // 		setName('');
  // 		setStartDate(new Date());
  // 		setLength(0);
  // 	} catch {
  // 		console.log(error);
  // 	}
  // }

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
              value={challengeData.name}
              id="name"
              required
              // disabled={loading}
              onChange={handleInputChange}
            />
          </div>

          <Link to="/add-challenge">
            <button>Actions</button>
          </Link>
          {/* <div className="form-example">
						<label htmlFor="startDate">Date de début :</label>
						<input
							type="date"
							name="startDate"
							value={
								challengeData.start_date
									? format(startDate, 'yyyy-MM-dd')
									: undefined
							}
							id="startDate"
							required
							disabled={loading}
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
							disabled={loading}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-example">
						<input
							type="submit"
							value="Choisir les actions"
							onClick={onSubmit}
						/>
					</div> */}
        </form>
      </Suspense>
    </div>
  );
};

export default CreateChallenge;
