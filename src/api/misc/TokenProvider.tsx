import React, {
  createContext, useContext, useMemo, useState,
} from 'react';

// eslint-disable-next-line no-unused-vars
const useTokenStorage = (): [string | null, (token: string) => void] => {
  const [token, setStateToken] = useState(() => {
    try {
      const item = window.localStorage.getItem('token');
      return item;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('failed to retrieve token from storage: ', error);
      }
      return '';
    }
  });

  const setToken = (value: string): void => {
    try {
      setStateToken(value);
      window.localStorage.setItem('token', value);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('failed to set token to storage: ', error);
      }
    }
  };

  return [token, setToken];
};

let APIContext: any;

export function useToken(): any {
  const value = useContext(APIContext);
  return value || {};
}

const TokenProvider: React.FC = ({ children }) => {
  const [token, setToken] = useTokenStorage();

  const value = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token, setToken],
  );

  APIContext = createContext(value);

  return (<APIContext.Provider value={value}>{children}</APIContext.Provider>);
};

export default TokenProvider;
