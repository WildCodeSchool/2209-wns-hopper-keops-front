import { gql } from "@apollo/client";

export const createChallenge = gql`
  mutation CreateChallenge($data: ChallengeInput!) {
    createChallenge(data: $data) {
      name
      length
      start_date
    }
  }
`
