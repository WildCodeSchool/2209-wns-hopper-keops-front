import { gql } from "@apollo/client";

export const updateChallenge = gql`
  mutation UpdateChallenge($data: UserInput!) {
    updateChallenge(data: $data) {
      id
    }
  }
`;
