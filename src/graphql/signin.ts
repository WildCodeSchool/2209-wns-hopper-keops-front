import { gql } from "@apollo/client";

export const signin = gql`
  mutation Signin($data: UserInput!) {
    signin(data: $data)
  }
`
