import { gql } from "@apollo/client";

export const me = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

// La requête 'me' sert à récupérer la donnée de l'utilisateur depuis le token.
// Pas de parenthèse ! Truc chelou de graphql
