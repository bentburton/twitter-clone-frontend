import { gql } from '@apollo/client';

const RETWEET = gql`
mutation retweet($input:String!){
  retweet(id: $input){
    createdAt
    id
    user{
      username
    }
  }
}

`;

export default RETWEET;
