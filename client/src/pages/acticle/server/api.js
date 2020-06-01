import { gql } from "apollo-boost";
export const GET_PRODUCT = gql`
  query($id: String!) {
    getProduct(id: $id) {
      id
      name
      category {
        id
        name
        products {
          id
          name
        }
      }
    }
  }
`;
