import { gql } from "@apollo/client";

export const createUserToChallenge = gql`
  mutation CreateUserToChallenge($isAccepted: Boolean!, $challengeId: ID!) {
  createUserToChallenge(isAccepted: $isAccepted, challengeId: $challengeId) {
    id
    isAccepted
  }
}
`

