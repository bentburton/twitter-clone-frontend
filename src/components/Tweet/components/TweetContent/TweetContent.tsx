import React, { useState } from 'react';
import {
  Avatar, Collapse, List, Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import CommentModal from '../../../CommentModal';

const { Panel } = Collapse;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentDropdown = styled(Collapse)`
  width: 100%;
`;

const NewCommentButton = styled(Button)`
  margin-left: 8px;
`;

interface User {
  username: string;
  avatar: string;
}

interface TweetContentProps {
  body: string;
  comments: { body: string, user: User }[];
  tweetId: string;
}

const TweetContent: React.FC<TweetContentProps> = (
  { body, comments, tweetId },
) => {
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  return (
    <>
      <p>{body}</p>
      <CommentContainer>
        <CommentDropdown>
          <Panel header="Comments" key="1">
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item?.user?.avatar} />}
                    title={item?.body}
                    description={`@${item?.user?.username}`}
                  />
                </List.Item>
              )}
            />
          </Panel>
        </CommentDropdown>
        <NewCommentButton
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            setCommentModalVisible(true);
          }}
        />
      </CommentContainer>
      <CommentModal
        visible={commentModalVisible}
        setVisible={setCommentModalVisible}
        tweetId={tweetId}
      />
    </>
  );
};

export default TweetContent;
