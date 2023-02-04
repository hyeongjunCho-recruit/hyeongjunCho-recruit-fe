import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initalState 타입 정의
type StateType = {
  accessToken: string;
  user: {
    id: string;
    name: string;
  };
};

// initalState 생성
const initialState: StateType = {
  accessToken: '',
  user: {
    id: '',
    name: '',
  },
};

// 슬라이스생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    setUser: (state: StateType, action: PayloadAction<StateType>) => {
      // immer가 내장되어 있어서, 불변성 신경 쓰지 않고 바로 수정해주면 된다.
      state.accessToken = action.payload?.accessToken ?? '';
      state.user = {
        id: action.payload?.user?.id,
        name: action.payload?.user?.name,
      };
    },
    clearUser: (state: StateType, action: PayloadAction<StateType>) => {
      state.accessToken = '';
      state.user = { id: '', name: '' };
    },
  },
});

// 액션을 export 해준다.
export const { setUser, clearUser } = userSlice.actions;

// 슬라이스를 export 해준다.
export default userSlice;
