import { gql } from "@apollo/client";

export const deleteMySuccess = gql`
  mutation DeleteMySuccess($data: DeleteSuccessInput!) {
    deleteSuccess(data: $data) {
      date
    }
  }
`;