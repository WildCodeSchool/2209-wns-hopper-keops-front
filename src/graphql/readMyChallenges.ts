import { gql } from "@apollo/client";

export const readMyChallenges = gql`
  query ReadMyChallenges {
    readMyChallenges {
      actions {
        id
        description
        successValue
        title
      }
      end_date
      id
      is_in_progress
      length
      name
      start_date
      createdBy {
        id
      }
      userToChallenges {
        user {
          id
          name
        }
      }
    }
  }
`;
