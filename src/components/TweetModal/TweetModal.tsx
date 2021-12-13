import React, { useState } from 'react';
import { Modal, Input, Alert } from 'antd';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { TWEET } from '../../api/mutations';
import { GET_ALL_TWEETS } from '../../api/queries';

interface TweetModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorAlert = styled(Alert)`
  margin-top: 8px;
`;

const TweetModal: React.FC<TweetModalProps> = (
  { visible, setVisible },
) => {
  const [tweetValue, setTweetValue] = useState('');
  const [errorText, setErrorText] = useState('');

  const [comment, { loading }] = useMutation(TWEET);

  const handleOk = async (): Promise<any> => {
    if (tweetValue) {
      await comment({
        variables: {
          input: {
            body: tweetValue,
          },
        },
        onError: () => {
          setErrorText('There was an error uploading the tweet');
        },
        refetchQueries: [{ query: GET_ALL_TWEETS }],
      });
      setVisible(false);
    } else {
      setErrorText('Please enter a tweet');
    }
  };

  const handleCancel = (): any => {
    setVisible(false);
  };

  return (
    <Modal
      title="New Tweet"
      visible={visible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      <Input.TextArea
        placeholder="This is my tweet..."
        value={tweetValue}
        onChange={(e) => setTweetValue(e.target.value)}
        rows={2}
      />
      {errorText && (
        <ErrorAlert
          description={errorText}
          type="error"
          closable
          onClose={() => setErrorText('')}
        />
      )}
    </Modal>
  );
};

export default TweetModal;
