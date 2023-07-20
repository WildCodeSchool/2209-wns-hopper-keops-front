import { useQuery } from "@apollo/client";
import { IChallenge } from "../interfaces/IChallenge";
import { readMyChallenges } from "../graphql/readMyChallenges";
import ChallengeCard from "./ChallengeCard";

const ChallengesList = () => {
  const { data } = useQuery<{ readMyChallenges: IChallenge[] }>(
    readMyChallenges,
    { fetchPolicy: "cache-and-network" }
  );

const filtredAndSortChallenges = (challenges: IChallenge[]) => {
  const dateToday = new Date();

  const isProgressChallenges = challenges.filter((challenge) => challenge.is_in_progress === true && new Date(challenge.end_date) > dateToday);
  const upcomingChallenges = challenges.filter((challenge) => new Date(challenge.start_date) > dateToday);
  const finishedChallenges = challenges.filter((challenge) => new Date(challenge.end_date) < dateToday);

  isProgressChallenges?.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());
  upcomingChallenges?.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  finishedChallenges?.sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());

  if (isProgressChallenges && upcomingChallenges && finishedChallenges) {
    const filteredChallenges = isProgressChallenges.concat(upcomingChallenges).concat(finishedChallenges);
    return filteredChallenges;
  }

  return [];
};

const filteredChallenges = filtredAndSortChallenges(data?.readMyChallenges || []);

console.log(data?.readMyChallenges)

  return (
    <div>
      <h2 className="title">Mes challenges</h2>
      <div className="list">
        {filteredChallenges.map((challenge) => (
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
