import instance from './Instance';

export const validateId = async (id) => {
  try {
    const response = await instance.post('/validation-id', {
      loginId: id,
    });

    const result = response.data;
    return result.message;
  } catch (error) {
    console.error('Error validating ID:', error);
    return 'Error occurred while validating the ID';
  }
};

export const validateNickname = async (nick) => {
  try {
    const response = await instance.post('/validation-nickname', {
      nickname: nick,
    });

    const result = response.data;
    return result.message;
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};

export const registUser = async (userId, nickname, userPw) => {
  try {
    const response = await instance.post('/join', {
      loginId: userId,
      nickname: nickname,
      password: userPw,
    });

    const result = response.data;
    return result.message;
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};

export const login = async (loginId, password) => {
  try {
    const response = await instance.post('/login', {
      loginId: loginId,
      password: password,
    });

    const result = response.data;
    return {
      message: result.message,
      accessToken: result.data.accessToken,
    };
  } catch (error) {
    const result = error.response.data;
    return { message: result.message };
  }
};

export const logoutUser = async (accessToken) => {
  try {
    const response = await instance.post('/logoutUser', {
      accessToken: accessToken,
    });

    const result = response.data;
    return result.message;
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};
