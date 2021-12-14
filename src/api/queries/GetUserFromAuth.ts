import { gql } from '@apollo/client';

const GET_USER_FROM_AUTH = gql`
query GetUserFromAuth{
  currentUser {
    username
    avatar
    id
  }
}
`;

export default GET_USER_FROM_AUTH;
