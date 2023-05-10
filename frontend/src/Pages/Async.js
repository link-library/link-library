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

export const login = async (userId, userPw) => {
  try {
    const response = await instance.post('/login', {
      loginId: userId,
      password: userPw,
    });

    const result = response.data;
    return {
      message: result.message,
      grantType: result.data.grantType,
      accessToken: result.data.accessToken,
      accessTokenExpiresIn: result.data.accessTokenExpiresIn,
    };
  } catch (error) {
    const result = error.response.data;
    return { message: result.message };
  }
};
