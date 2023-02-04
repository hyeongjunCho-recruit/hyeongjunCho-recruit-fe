import type { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/modules/userSlice';
import { useRouter } from 'next/router';
import { useAppSelector } from './_app';


const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [idFilled, setIdFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  if (user?.name && user?.id) {
    router.replace('/', '', { shallow: true });
  }

  const isValidID = (id: string) => {
    if (id.length < 5 || id.length > 30) return false;
    const regex = /[a-zA-Z0-9]*/;
    const matched = id.match(regex);
    if (!matched) return false;
    if (matched[0] !== id) return false;
    return true;
  };

  const isValidPW = (password: string) => {
    if (password.length < 8 || password.length > 30) return false;
    const regex = /[a-zA-Z0-9]*/;
    const matched = password.match(regex);
    if (!matched) return false;
    if (matched[0] !== password) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    return true;
  };

  const confirmID = (id: string) => {
    if (!isValidID(id)) {
      setIdFilled(false);
      setError('invalid-id', { type: 'custom', message: '올바른 아이디 형식으로 입력해주세요.' });
    } else {
      setIdFilled(true);
      clearErrors('invalid-id');
    }
  };

  const confirmPW = (password: string) => {
    if (!isValidPW(password)) {
      setPasswordFilled(false);
      setError('invalid-password', {
        type: 'custom',
        message: '올바른 비밀번호 형식으로 입력해주세요.',
      });
    } else {
      setPasswordFilled(true);
      clearErrors('invalid-password');
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post('/login', {
        id: data.id,
        password: data.password,
      })
      .then((response) => {
        if (!response.data?.data?.accessToken) return;
        if (!response.data?.data?.user?.id) return;
        if (!response.data?.data?.user?.name) return;
        window.localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(setUser(response.data.data));
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormElement>
          <Label>아이디</Label>
          <TextInput
            type='text'
            {...register('id', { required: true })}
            invalid={!!errors['invalid-id']}
            onBlur={(e) => confirmID(e.currentTarget.value)}
          />
          {errors['invalid-id'] && <ErrorText>{errors['invalid-id'].message as string}</ErrorText>}
        </FormElement>
        <FormElement>
          <Label>비밀번호</Label>
          <TextInput
            type='password'
            {...register('password', { required: true })}
            invalid={!!errors['invalid-password']}
            onBlur={(e) => confirmPW(e.currentTarget.value)}
          />
          {errors['invalid-password'] && (
            <ErrorText>{errors['invalid-password'].message as string}</ErrorText>
          )}
        </FormElement>
        <LoginButton disabled={!idFilled || !passwordFilled} type='submit'>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  &:not(:first-child) {
    margin-top: 15px;
  }
`;

const Label = styled.label`
  width: 100%;
  font-weight: bold;
  font-size: 13px;
  color: #6c6c7d;
`;

const TextInput = styled.input<{
  invalid: boolean;
}>`
  width: 100%;
  margin-top: 8px;
  padding: 16px;
  background-color: ${(props) => (props.invalid ? '#fdedee' : '#f7f7fa')};
  border-radius: 12px;
`;

const ErrorText = styled.p`
  width: 100%;
  margin: 8px 0 0 0;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
