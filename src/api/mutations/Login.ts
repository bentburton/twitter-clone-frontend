import { gql } from '@apollo/client';

const LOGIN = gql`
mutation LoginMutation($input:LoginUserInput!) {
  loginUser(input: $input){
    username
    token
  }
}
`;

export default LOGIN;
