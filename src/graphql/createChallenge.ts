import { gql } from "@apollo/client";

export const createChallenge = gql`
  mutation CreateChallenge($data: CreateChallengeInput!) {
    createChallenge(data: $data) {
      id
    }
  }
`
