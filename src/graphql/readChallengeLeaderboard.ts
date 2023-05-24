import { gql } from "@apollo/client";

export const readChallengeLeaderboard = gql`
query readChallengeLeaderboard($challengeId: String!) {
    readChallengeLeaderboard(challengeId: $challengeId) {
      user {
        name
      }
      challengeScore
    }
  }    
`;