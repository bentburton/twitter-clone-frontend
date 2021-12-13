import React from 'react';
import { PageHeader, Button } from 'antd';
import { useToken } from './api/misc';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

// Main page
const App: React.FC = () => {
  const { token, setToken } = useToken();

  let page = (<Login />);
  if (token) {
    page = (<Home />);
  }

  const buttons = [];

  if (token) {
    buttons.push(
      <Button key="1" onClick={() => setToken()}>Sign Out</Button>,
    );
  }

  return (
    <div>
      <PageHeader
        title="HSTwitter"
        extra={buttons}
      />
      {page}
    </div>
  );
};

export default App;
