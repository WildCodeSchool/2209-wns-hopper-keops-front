import { gql } from "@apollo/client";

export const readOneChallenge = gql`
  query ReadOneChallenge($challengeId: ID!) {
    readOneChallenge(challengeID: $challengeId) {
      name
      length
      is_in_progress
      id
      start_date
      createdBy {
        id
        name
      }
      actions {
        description
        id
        successValue
        title
      }
      userToChallenges {
        id
        user {
          id
          name
        }
      }
    }
  }
`;
