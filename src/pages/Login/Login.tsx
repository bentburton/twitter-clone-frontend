import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import {
  Form, Input, Button, Typography,
} from 'antd';

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<String | undefined>>
}

const Login: FunctionComponent<LoginProps> = ({ setToken }) => {
  const onFinish = (values: {username: string, password: string}): void => {
    setToken(values.username);
  };

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
    </Container>
  );
};

export default Login;
