import { gql } from "@apollo/client";

export const updateActionToChallenge = gql`
  mutation UpdateActionToChallenge(
    $data: ActionToChallengeInput!
    $challengeId: ID!
  ) {
    updateActionToChallenge(data: $data, challengeId: $challengeId) {
      actions {
        id
      }
      id
    }
  }
`;
