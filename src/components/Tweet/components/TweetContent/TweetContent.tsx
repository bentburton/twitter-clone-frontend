import React from 'react';
import {
  Avatar, Collapse, List,
} from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentDropdown = styled(Collapse)`
  width: 100%;
`;

interface User {
  username: string;
  avatar: string;
}

interface TweetContentProps {
  body: string;
  comments: { body: string, user: User }[];
}

const TweetContent: React.FC<TweetContentProps> = (
  { body, comments },
) => (
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
    </CommentContainer>
  </>
);

export default TweetContent;
