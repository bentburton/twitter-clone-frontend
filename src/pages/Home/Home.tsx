import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_ALL_TWEETS } from '../../api/queries';
import Tweet, { LoadingTweet } from '../../components/Tweet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home: FunctionComponent = () => {
  const { data, loading } = useQuery(GET_ALL_TWEETS);
  console.log(data);
  return (
    <Container>
      {loading ? (
        <LoadingTweet />
      ) : data?.tweets?.map((tweet: any) => (
        <Tweet tweet={tweet} key={tweet?.id} />
      ))}
    </Container>
  );
};

export default Home;
