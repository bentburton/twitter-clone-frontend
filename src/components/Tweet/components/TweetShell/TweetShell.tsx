import React, { useState } from 'react';
import {
  Card, Avatar, Button, Alert,
} from 'antd';
import {
  MessageOutlined,
  RetweetOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { RETWEET } from '../../../../api/mutations';
import { GET_ALL_TWEETS } from '../../../../api/queries';
import CommentModal from '../../../CommentModal';

const { Meta } = Card;

interface TweetShellProps {
  title: string;
  avatar?: string;
  type?: 'inner' | undefined;
  loading?: boolean;
  className?: any;
  isRetweet?: boolean;
  tweetId?: string;
}

const ActionButton = styled(Button)`
  margin: 8px;
`;

const ErrorAlert = styled(Alert)`
  margin-top: 8px;
`;

const TweetShell: React.FC<TweetShellProps> = (
  {
    title, avatar, loading, type, children, className, isRetweet, tweetId,
  },
) => {
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [retweet, { loading: retweetLoading }] = useMutation(RETWEET);
  const [errorText, setErrorText] = useState('');

  const onRetweetClick = (): any => {
    retweet({
      variables: { input: tweetId },
      onError: ((e) => setErrorText(e.message)),
      refetchQueries: [{ query: GET_ALL_TWEETS }],
    });
  };

  const actions = [];

  if (!isRetweet && tweetId) {
    actions.push([
      <ActionButton
        size="middle"
        icon={<MessageOutlined />}
        onClick={() => {
          setCommentModalVisible(true);
        }}
        key="comment"
      >
        Add comment
      </ActionButton>,
      <ActionButton
        size="middle"
        icon={retweetLoading ? <LoadingOutlined /> : <RetweetOutlined />}
        onClick={() => {
          onRetweetClick();
        }}
        key="retweet"
      >
        Retweet
      </ActionButton>,
    ]);
  }

  return (
    <>
      <Card
        loading={loading}
        className={className}
        actions={actions}
        type={type}
      >
        <Meta
          title={title}
          avatar={<Avatar src={avatar} />}
        />
        {children}
        {errorText && (
        <ErrorAlert
          description={errorText}
          type="error"
          closable
          onClose={() => setErrorText('')}
        />
        )}
      </Card>
      {tweetId && ( // use tweetId is indicator that comment is allowed
      <CommentModal
        visible={commentModalVisible}
        setVisible={setCommentModalVisible}
        tweetId={tweetId}
      />
      )}
    </>
  );
};

TweetShell.defaultProps = {
  type: undefined,
  loading: false,
  avatar: undefined,
  className: undefined,
  isRetweet: false,
  tweetId: undefined,
};

export default TweetShell;
