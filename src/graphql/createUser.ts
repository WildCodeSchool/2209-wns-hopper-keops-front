import { gql } from "@apollo/client";

export const createUser = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`
