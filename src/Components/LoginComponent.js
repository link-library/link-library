import React, { useState } from 'react';
import {
  Container,
  LoginBox,
  Form,
  Input,
  Button,
} from '../Style/LoginPageStyle';

export const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <Container>
      <LoginBox>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit">Login</Button>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default LoginComponent;
