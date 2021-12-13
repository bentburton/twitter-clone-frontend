import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import {
  Alert, Form, Input, Button, Typography, Spin,
} from 'antd';
import { LOGIN } from '../../api/mutations';
import { useToken } from '../../api/misc';

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
`;

const LoadingIcon = styled(Spin)`
  margin-top: 50px;
`;

interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  const [login, { data, loading }] = useMutation(LOGIN);
  // eslint-disable-next-line no-unused-vars
  const { setToken } = useToken();
  const [errorText, setErrorText] = useState('');

  const onFinish = (
    { username, password }: {username: string, password: string},
  ): void => {
    login(
      {
        variables: { input: { username, password } },
        onError: (e) => setErrorText(e.message),
      },
    );
  };

  useEffect(() => {
    if (data?.loginUser?.token) {
      setToken(data?.loginUser?.token);
    }
  }, [data, setToken]);

  if (loading) {
    return <Container><LoadingIcon size="large" /></Container>;
  }

  return (
    <Container>
      <Title>Login</Title>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {errorText && (
      <Alert
        message="Error"
        description={errorText}
        type="error"
        closable
        onClose={() => setErrorText('')}
      />
      )}
    </Container>
  );
};

export default Login;
