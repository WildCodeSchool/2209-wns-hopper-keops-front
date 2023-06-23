import { gql } from "@apollo/client";

export const editUser = gql`
  mutation Mutation($data: UpdateUserInput!) {
    updateMe(data: $data) {
      name
      id
    }
  }
`;
