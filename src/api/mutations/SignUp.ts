import { gql } from '@apollo/client';

const SIGN_UP = gql`
mutation RegisterMutation($input:RegisterUserInput!) {
  registerUser(input: $input){
    username
    token
  }
}
`;

export default SIGN_UP;
