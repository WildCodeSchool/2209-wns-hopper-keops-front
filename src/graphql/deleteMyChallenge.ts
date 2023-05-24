import { gql } from "@apollo/client";

export const deleteMyChallenge = gql`
  mutation DeleteMyChallenge($challengeId: ID!) {
    deleteMyChallenge(challengeId: $challengeId) {
      name
    }
  }
`;
