import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    grantType: null,
    accessToken: null,
    accessTokenExpiresIn: null,
  },
});

export const userState = atom({
  // 현재 로그인된 유저 정보
  key: 'userState',
  default: JSON.parse(localStorage.getItem('usersState') ?? '[]'),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('userState', JSON.stringify(newValue));
      });
    },
  ],
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
          const loggedInUser = storedUsers.find((user) => user.id === newValue);
          onSet(userState, loggedInUser); // 로그인 된 유저 정보 불러오기
          onSet(userCategoriesState, loggedInUser.categories); // 로그인 한 유저의 카테고리 정보 불러오기
        }
      });
    },
  ],
});

export const isSidebarOpenState = atom({
  // 사이드바 열림/닫힘 상태
  key: 'isSidebarOpenState',
  default: false,
});

export const expandedCategoryState = atom({
  // 카테고리 열림/닫힘 상태
  key: 'expandedCategoryState',
  default: [],
});

export const isCreatingNewCategoryState = atom({
  // 새로운 카테고리 생성 확인용
  key: 'isCreatingNewCategoryState',
  default: null,
});

export const updateUserCategories = (userCategories, loggedInUserId) => {
  const users = JSON.parse(localStorage.getItem('usersState')) ?? [];
  const updatedUsers = users.map((user) =>
    user.id === loggedInUserId ? { ...user, categories: userCategories } : user
  );
  localStorage.setItem('usersState', JSON.stringify(updatedUsers));
};

export const userCategoriesState = atom({
  key: 'userCategoriesState',
  default: [
    { id: '1', name: '페이지 목록', categories: [] },
    { id: '2', name: '미구현', categories: [] },
  ],
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      onSet((newValue) => {
        const loggedInUserId = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (loggedInUserId !== null) {
          updateUserCategories(newValue, loggedInUserId);
        }
      });
    },
    ({ setSelf }) => {
      const loggedInUserId = JSON.parse(localStorage.getItem('isLoggedIn'));
      if (loggedInUserId !== null) {
        const users = JSON.parse(localStorage.getItem('usersState')) ?? [];
        const loggedInUser = users.find((user) => user.id === loggedInUserId);
        if (loggedInUser) {
          setSelf(loggedInUser.categories);
        }
      }
    },
  ],
});

export const selectedCategoryNameState = atom({
  key: 'selectedCategoryNameState',
  default: '헤더 테스트',
});

export const activeCategoryPostsAtom = atom({
  // 클릭한 카테고리 정보를 비동기 통신으로 받아올 저장소
  key: 'activeCategoryList',
  default: [],
});
