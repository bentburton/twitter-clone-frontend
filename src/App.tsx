import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

const { Title } = Typography;

const GlobalTitle = styled(Title)`
  padding-top: 5px;
  padding-left: 5px;
`;

// Main page
const App: FunctionComponent = () => {
  const [token, setToken] = useState<String>();

  let page = (<Login setToken={setToken} />);

  if (!token) {
    page = (<Home />);
  }

  return (
    <div>
      <GlobalTitle level={3}>HSTwitter</GlobalTitle>
      {page}
    </div>
  );
};

export default App;
