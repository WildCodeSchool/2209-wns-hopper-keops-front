import { gql } from "@apollo/client";

export const removeUserToChallenge = gql`
  mutation RemoveUserToChallenge($data: RemoveUserToChallengeInput!) {
    deleteUserToChallenge(data: $data) {
      isAccepted
    }
  }
`;
