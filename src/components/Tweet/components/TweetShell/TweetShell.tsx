import React from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

interface TweetShellProps {
  title: string;
  avatar?: string;
  type?: 'inner' | undefined;
  loading?: boolean;
  className?: any;
}

const TweetShell: React.FC<TweetShellProps> = (
  {
    title, avatar, loading, type, children, className,
  },
) => (
  <Card type={type} loading={loading} className={className}>
    <Meta
      title={title}
      avatar={<Avatar src={avatar} />}
    />
    {children}
  </Card>
);

TweetShell.defaultProps = {
  type: undefined,
  loading: false,
  avatar: undefined,
  className: undefined,
};

export default TweetShell;
