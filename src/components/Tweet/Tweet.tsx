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
    isRetweet={tweet?.retweet}
    tweetId={tweet?.id}
  >
    {tweet?.retweet ? (
      <InnerTweetCard
        title={`@${tweet?.retweet?.user?.username}`}
        avatar={tweet?.retweet?.user?.avatar}
        type="inner"
        tweetId={tweet?.retweet?.id}
      >
        <TweetContent
          body={tweet?.retweet?.body}
          comments={tweet?.retweet?.comments}
        />
      </InnerTweetCard>
    ) : (
      <TweetContent
        body={tweet?.body}
        comments={tweet?.comments}
      />
    )}
  </TweetCard>
);

export const LoadingTweet: React.FC = () => (
  <TweetCard loading title="loading" />
);

export default Tweet;
