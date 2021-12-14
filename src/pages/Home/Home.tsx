import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GET_ALL_TWEETS } from '../../api/queries';
import Tweet, { LoadingTweet } from '../../components/Tweet';
import TweetModal from '../../components/TweetModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home: React.FC = () => {
  const { data, loading } = useQuery(GET_ALL_TWEETS);
  const [tweetModalVisible, setTweetModalVisible] = useState(false);

  return (
    <>
      <Container>
        <Button
          type="default"
          size="large"
          onClick={() => setTweetModalVisible(true)}
        >
          Compose Tweet
          <EditOutlined />
        </Button>
        {loading ? (
          <LoadingTweet />
        ) : data?.tweets?.map((tweet: any) => (
          <Tweet tweet={tweet} key={tweet?.id} />
        ))}
      </Container>
      <TweetModal
        visible={tweetModalVisible}
        setVisible={setTweetModalVisible}
      />
    </>
  );
};

export default Home;
