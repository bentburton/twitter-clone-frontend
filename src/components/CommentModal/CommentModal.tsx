import React, { useState } from 'react';
import { Modal, Input, Alert } from 'antd';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { COMMENT_ON_TWEET } from '../../api/mutations';
import { GET_ALL_TWEETS } from '../../api/queries';

const ErrorAlert = styled(Alert)`
  margin-top: 8px;
`;
interface CommentModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tweetId: string;
}

const CommentModal: React.FC<CommentModalProps> = (
  { visible, setVisible, tweetId },
) => {
  const [commentValue, setCommentValue] = useState('');
  const [errorText, setErrorText] = useState('');

  const [comment, { loading }] = useMutation(COMMENT_ON_TWEET);

  const handleOk = async (): Promise<any> => {
    if (commentValue) {
      await comment({
        variables: {
          input: {
            id: tweetId,
            body: commentValue,
          },
        },
        onError: () => {
          setErrorText('There was an error uploading the comment');
        },
        refetchQueries: [{ query: GET_ALL_TWEETS }],
      });
      setVisible(false);
    } else {
      setErrorText('Please enter a comment');
    }
  };

  const handleCancel = (): any => {
    setVisible(false);
  };

  return (
    <Modal
      title="Enter Comment"
      visible={visible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      <Input
        placeholder="This is my comment..."
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
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

export default CommentModal;
