import { gql } from "@apollo/client";

export const updateChallenge = gql`
  mutation Mutation($challengeId: ID!, $data: UpdateChallengeInput!) {
    updateChallenge(challengeId: $challengeId, data: $data) {
      id
    }
  }
`;
