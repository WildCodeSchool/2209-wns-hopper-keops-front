import { gql } from "@apollo/client";

export const signin = gql`
  mutation Signin($password: String!, $email: String!) {
    signin(password: $password, email: $email)
  }
`
