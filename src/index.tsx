import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
} from '@apollo/client';
import { TokenProvider, client } from './api/misc';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
