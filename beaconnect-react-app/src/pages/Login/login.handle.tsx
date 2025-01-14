import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';

import Login from './login';
import { useUserContext } from '../../userContext';
import {
  loginQuery,
  registerQuery,
  LoginMutationResult,
  LoginMutationVariables,
  RegisterMutationResult,
  RegisterMutationVariables,
} from './components/login.query';

// eslint-disable-next-line no-undef
const LoginCompound = (props: {
  loginType: string;
  isLoggedIn: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) => {
  const { loginType, isLoggedIn, setIsLoggedIn } = props;
  if (isLoggedIn) return <Navigate to="/" replace />;
  const navigate = useNavigate();
  const { signIn } = useUserContext();
  const [currentLoginType, setCurrentLoginType] = useState(loginType);
  const [errorMessage, setErrorMessage] = useState('');
  const changeLoginType = (type: string) => () => {
    setCurrentLoginType(type === 'Login' ? 'Register' : 'Login');
    window.history.pushState({}, '', type === 'Login' ? '/register' : '/login');
    setErrorMessage('');
    document.querySelector('form')?.reset();
  };

  const [login, { loading: loginLoading }] = useMutation<LoginMutationResult, LoginMutationVariables>(loginQuery, {
    onCompleted: (data) => {
      const {
        login: { token },
      } = data;
      signIn(token);
      setIsLoggedIn(true);
      navigate('/', { replace: true });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const [register, { loading: registerLoading }] = useMutation<RegisterMutationResult, RegisterMutationVariables>(
    registerQuery,
    {
      onCompleted: (data) => {
        const {
          register: { id },
        } = data;
        if (id) changeLoginType('Register')();
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    },
  );

  const handleLogin = (email: string, password: string) => {
    login({ variables: { email, password } });
  };
  const handleRegister = (email: string, username: string, password: string, confirmPassword: string) => {
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) setErrorMessage('Invalid email');
    else if (password !== confirmPassword) setErrorMessage('Passwords do not match');
    else register({ variables: { email, password, username } });
  };

  return (
    <Login
      loginType={currentLoginType}
      changeLoginType={changeLoginType}
      onLogin={handleLogin}
      onRegister={handleRegister}
      Loading={registerLoading || loginLoading}
      errorMessage={errorMessage}
    />
  );
};

export default LoginCompound;
