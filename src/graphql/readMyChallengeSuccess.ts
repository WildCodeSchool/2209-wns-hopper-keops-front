import { gql } from "@apollo/client";

export const readMyChallengeSuccesses = gql`
  query ReadMyChallengeSuccesses($challengeId: ID!) {
    readMyChallengeSuccesses(challengeId: $challengeId) {
      action {
        id
      }
      id
      date
    }
  }
`;
