import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Affix, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GET_ALL_TWEETS } from '../../api/queries';
import Tweet, { LoadingTweet } from '../../components/Tweet';
import TweetModal from '../../components/TweetModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AffixContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px
`;

const Home: React.FC = () => {
  const { data, loading } = useQuery(GET_ALL_TWEETS);
  const [tweetModalVisible, setTweetModalVisible] = useState(false);

  return (
    <>
      <Container>
        {loading ? (
          <LoadingTweet />
        ) : data?.tweets?.map((tweet: any) => (
          <Tweet tweet={tweet} key={tweet?.id} />
        ))}
      </Container>
      <AffixContainer>
        <Affix offsetBottom={20}>
          <Button type="primary" onClick={() => setTweetModalVisible(true)}>
            Compose Tweet
            <EditOutlined />
          </Button>
        </Affix>
      </AffixContainer>
      <TweetModal
        visible={tweetModalVisible}
        setVisible={setTweetModalVisible}
      />
    </>
  );
};

export default Home;
