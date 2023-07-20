import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { readChallengeLeaderboard } from "../graphql/readChallengeLeaderboard";
import { IUserToChallenge } from "../interfaces/IUserToChallenge";
import { useParams } from "react-router-dom";
import './ChallengeLeaderboardPage.css';

const trophyEmoji = "🏆";
const medalEmoji = "🏅";
const rosetteEmoji = "🏵️";

interface ChallengeLeaderboardData {
  readChallengeLeaderboard: IUserToChallenge[];
}

const ChallengeLeaderboardPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { loading, error, data } = useQuery<ChallengeLeaderboardData>(readChallengeLeaderboard, {
    variables: { challengeId },
  });

  const userToChallenges: IUserToChallenge[] = useMemo(() => {
    if (data) {
      return data.readChallengeLeaderboard;
    } else {
      return [];
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Sort the userToChallenges array by challengeScore in descending order
  userToChallenges.sort((a, b) => b.challengeScore - a.challengeScore);

  return (
    <div className="rankingPage">
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
                <td>
                  {index === 0 ? (
                    <span className="rank-icon">{trophyEmoji}</span>
                  ) : index === 1 ? (
                    <span className="rank-icon">{medalEmoji}</span>
                  ) : index === 2 ? (
                    <span className="rank-icon">{rosetteEmoji}</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </td>
                <td>{userToChallenge.user?.name}</td>
                <td>{userToChallenge.challengeScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {userToChallenges.length === 0 && (
        <p>Aucun utilisateur dans le classement.</p>
      )}
    </div>
  );
};

export default ChallengeLeaderboardPage;
