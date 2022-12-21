import { gql } from "@apollo/client";

export const me = gql`
  mutation Me(token: String!) {
    me(token: $token){
      id
      email
    }
  }
`
