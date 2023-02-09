import axios from 'axios';
import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { Provider, TypedUseSelectorHook, useSelector } from 'react-redux';

import setupMSW from '../api/setup';
import store, { RootState } from '../store';
import GlobalStyle from '../styles/GlobalStyle';
import Header from '../components/Header';

setupMSW();

axios.defaults.baseURL = 'https://api.sixshop.com';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background />
      <Content>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </Content>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
