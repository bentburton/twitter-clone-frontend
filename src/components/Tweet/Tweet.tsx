import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import TweetShell from './components/TweetShell';
import TweetContent from './components/TweetContent';

const TweetCard = styled(TweetShell)` 
  width: 300px;
  margin-top: 16px;
`;

const InnerTweetCard = styled(TweetShell)`
  width: 100%;
  margin-top: 24px;
`;

interface TweetProps{
  tweet: any;
}

const Tweet: FunctionComponent<TweetProps> = ({ tweet }) => {
  console.log(tweet);
  return (
    <TweetCard
      title={`@${tweet?.user?.username}${tweet?.retweet ? ' 🔁 retweeted' : ''}`}
      avatar={tweet?.user?.avatar}
      key={tweet?.id}
    >
      {tweet?.retweet ? (
        <InnerTweetCard
          title={`@${tweet?.retweet?.user?.username}`}
          avatar={tweet?.retweet?.user?.avatar}
        >
          <TweetContent
            body={tweet?.retweet?.body}
            comments={tweet?.retweet?.comments}
          />
        </InnerTweetCard>
      ) : (
        <TweetContent body={tweet?.body} comments={tweet?.comments} />
      )}
    </TweetCard>
  );
};

export const LoadingTweet: FunctionComponent = () => (
  <TweetCard loading title="loading" />
);

export default Tweet;
