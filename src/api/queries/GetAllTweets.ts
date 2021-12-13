import { gql } from '@apollo/client';

const GET_ALL_TWEETS = gql`
fragment UserInfo on User {
  username
  avatar
}

fragment CommentInfo on Comment {
  body
  user {
    ...UserInfo
  }
  createdAt
}

query GetAllTweets {
  tweets {
    __typename
    ... on Retweet {
      id
      createdAt
      user {
        ...UserInfo
      }
      retweet {
        id
        createdAt
        body
        user {
          ...UserInfo
        }
        comments {
          ...CommentInfo
        }
      }
    }
    ... on NormalTweet {
      id
      createdAt
      user {
        ...UserInfo
      }
      body
      comments {
        ...CommentInfo
      }
    }
  }
}
`;

export default GET_ALL_TWEETS;
