import { gql } from "@apollo/client";

export const readAllActions = gql`
  query ReadAllActions {
    readAllActions {
      id
      title
      description
    }
  }
`
