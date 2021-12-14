import React, { useState } from 'react';
import { PageHeader, Button } from 'antd';
import { useQuery } from '@apollo/client';
import { useToken } from './api/misc';
import Login from './pages/Login';
import Home from './pages/Home';
import { GET_USER_FROM_AUTH } from './api/queries';
import './App.css';

// Main page
const App: React.FC = () => {
  const { token, setToken } = useToken();
  const { data: currentUserData } = useQuery(GET_USER_FROM_AUTH);
  const [isSignUp, setIsSignUp] = useState(false);

  let page = (<Login signUp={isSignUp} />);
  const buttons = [];

  const showHomePage = token && token !== 'undefined';

  if (showHomePage) {
    page = (<Home />);
    buttons.push(
      <Button
        key="1"
        size="large"
        onClick={() => {
          setToken();
        }}
      >
        Sign Out
      </Button>,
    );
  } else {
    buttons.push(
      <Button
        key="1"
        size="large"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Login' : 'Sign Up'}
      </Button>,
    );
  }
  const avatar = currentUserData?.currentUser?.avatar;

  return (
    <div>
      <PageHeader
        title="HSTwitter"
        extra={buttons}
        avatar={avatar && showHomePage ? { src: avatar } : undefined}
      />
      {page}
    </div>
  );
};

export default App;
