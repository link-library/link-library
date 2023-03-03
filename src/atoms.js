import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: { username: '', password: '' },
});

export const usersState = atom({
  key: 'usersState',
  default: [],
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});
