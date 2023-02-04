import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../pages/_app';
import { clearUser, setUser } from '../store/modules/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      dispatch(setUser(JSON.parse(window.localStorage.getItem('user') ?? "{}")));
    }
  }, []);
  return (
    <StyledHeader>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {user?.id && user?.name ? (
        <FlexDiv>
          <p>{user.name}</p>
          <p
            onClick={() => {
              window.localStorage.removeItem('user');
              dispatch(clearUser({ accessToken: '', user: { id: '', name: '' } }));
            }}
          >
            logout
          </p>
        </FlexDiv>
      ) : (
        <Link href='/login'>
          <p>login</p>
        </Link>
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.a`
  font-size: 48px;
`;
