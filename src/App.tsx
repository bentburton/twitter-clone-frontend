import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import Login from './pages/Login';
import './App.css';

const { Title } = Typography;

const GlobalTitle = styled(Title)`
  padding-top: 5px;
  padding-left: 5px;
`;

// Main page
const App: FunctionComponent = () => {
  const [token, setToken] = useState<String>();

  const page = (<Login setToken={setToken} />);

  if (token) {
    return (<Title level={3}>test</Title>);
  }

  return (
    <div>
      <GlobalTitle level={3}>HSTwitter</GlobalTitle>
      {page}
    </div>
  );
};

export default App;
