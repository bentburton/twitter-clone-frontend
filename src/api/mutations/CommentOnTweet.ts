import { gql } from '@apollo/client';

const COMMENT_ON_TWEET = gql`
mutation commentOnTweet($input:CommentOnTweetInput!){
  commentOnTweet(input: $input){
    body
    createdAt
    id
  }
}
`;

export default COMMENT_ON_TWEET;
