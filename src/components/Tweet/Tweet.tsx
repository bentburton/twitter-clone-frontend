import React from 'react';
import styled from 'styled-components';

import TweetShell from './components/TweetShell';
import TweetContent from './components/TweetContent';

const TweetCard = styled(TweetShell)` 
  width: 350px;
  margin-top: 16px;
`;

const InnerTweetCard = styled(TweetShell)`
  width: 100%;
  margin-top: 24px;
`;

interface TweetProps{
  tweet: any;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => (
  <TweetCard
    title={`@${tweet?.user?.username}${tweet?.retweet ? ' 🔁 retweeted' : ''}`}
    avatar={tweet?.user?.avatar}
  >
    {tweet?.retweet ? (
      <InnerTweetCard
        title={`@${tweet?.retweet?.user?.username}`}
        avatar={tweet?.retweet?.user?.avatar}
      >
        <TweetContent
          body={tweet?.retweet?.body}
          comments={tweet?.retweet?.comments}
          tweetId={tweet?.retweet?.id}
        />
      </InnerTweetCard>
    ) : (
      <TweetContent
        body={tweet?.body}
        comments={tweet?.comments}
        tweetId={tweet?.id}
      />
    )}
  </TweetCard>
);

export const LoadingTweet: React.FC = () => (
  <TweetCard loading title="loading" />
);

export default Tweet;
