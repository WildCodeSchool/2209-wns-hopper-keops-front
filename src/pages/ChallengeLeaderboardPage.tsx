import React from "react";
import { useQuery } from "@apollo/client";
import { readChallengeLeaderboard } from "../graphql/readChallengeLeaderboard";
import { IUserToChallenge } from "../interfaces/IUserToChallenge";
import { useParams } from "react-router-dom";

interface ChallengeLeaderboardData {
  readChallengeLeaderboard: IUserToChallenge[];
}

const ChallengeLeaderboardPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { loading, error, data } = useQuery<ChallengeLeaderboardData>(readChallengeLeaderboard, {
    variables: { challengeId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userToChallenges: IUserToChallenge[] = data?.readChallengeLeaderboard ?? [];

  // userToChallenges.sort((a, b) => b.challengeScore - a.challengeScore);

  return (
    <div>
      <h2>Classement du challenge</h2>
      {userToChallenges.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Nom</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {userToChallenges.map((userToChallenge, index) => (
              <tr key={userToChallenge.user?.id}>
                <td>{index + 1}</td>
                <td>{userToChallenge.user?.name}</td>
                <td>{userToChallenge.challengeScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} {userToChallenges.length === 0 && ( 
        <p>Aucun utilisateur dans le classement.</p>
      )}

    </div>
  );

};

export default ChallengeLeaderboardPage;
