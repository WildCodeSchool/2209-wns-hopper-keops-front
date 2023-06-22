import { gql } from "@apollo/client";

export const createSuccess = gql`
  mutation createSuccess($data: CreateSuccessInput!) {
    createSuccess(data: $data) {
      id
    }
  }
`
