import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export const userState = atom({
  // 현재 로그인된 유저 정보
  key: 'userState',
  default: { username: '', password: '' },
});

export const usersState = atom({
  // temporary user DB
  key: 'usersState',
  default: JSON.parse(localStorage.getItem('usersState') ?? '[]'),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('usersState', JSON.stringify(newValue));
      });
    },
  ],
});

export const saveUserToLocalStorage = (user) => {
  // 웹 키면 유저 데이터를  불러옴
  const users = JSON.parse(localStorage.getItem('usersState')) ?? [];
  localStorage.setItem('usersState', JSON.stringify([...users, user]));
};

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: JSON.parse(localStorage.getItem('isLoggedIn')),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('isLoggedIn', JSON.stringify(newValue));
      });
    },
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        if (oldValue !== undefined && newValue !== oldValue) {
          const storedUsers = JSON.parse(
            localStorage.getItem('usersState') ?? '[]'
          );
          onSet(usersState, storedUsers);
        }
      });
    },
  ],
});
