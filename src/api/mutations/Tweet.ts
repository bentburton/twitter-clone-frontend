import { gql } from '@apollo/client';

const TWEET = gql`
mutation createTweet($input:CreateTweetInput!){
  createTweet(input: $input){
    body
    createdAt
    id
  }
}
`;

export default TWEET;
