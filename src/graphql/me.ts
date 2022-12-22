import { gql } from "@apollo/client";

export const me = gql`
  query Me($token: String!) {
    me(token: $token){
      id
      email
    }
  }
`

// La requête 'me' sert à récupérer la donnée de l'utilisateur depuis le token.
