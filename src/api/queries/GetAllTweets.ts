import { gql } from '@apollo/client';

const GET_ALL_TWEETS = gql`
  query GetAllTweets {
    tweets {
      __typename
      ... on Retweet {
        createdAt
        user {
          username
        }
        retweet{
          createdAt
          body
          user{
            username
          }
        }
      }
      ... on NormalTweet {
        createdAt
        user {
          username
        }
      }
    }
  }
`;

export default GET_ALL_TWEETS;
