import { useQuery } from "@apollo/client";
import { IChallenge } from "../interfaces/IChallenge";
import { readMyChallenges } from "../graphql/readMyChallenges";
import ChallengeCard from "./ChallengeCard";

const ChallengesList = () => {
  const { data } = useQuery<{ readMyChallenges: IChallenge[] }>(
    readMyChallenges,
    { fetchPolicy: "cache-and-network" }
  );

  console.log("All challenges dashboard", data);

  return (
    <div>
      <h2 className="title">Mes challenges</h2>
      <div className="list">
        {data?.readMyChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            {...challenge}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengesList;
