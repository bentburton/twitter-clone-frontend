import React from 'react';
import { Avatar, Collapse, List } from 'antd';

const { Panel } = Collapse;

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
    <Collapse>
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
    </Collapse>
  </>
);

export default TweetContent;
