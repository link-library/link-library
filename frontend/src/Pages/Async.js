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

export const categoryCreate = async (categoryName) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.post(
      '/category',
      {
        name: categoryName,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    const result = response.data;
    return { message: result.message, receivedId: result.data };
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};

export const categoryEdit = async (categoryName, categoryId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.put(
      `/category/${categoryId}`,
      {
        name: categoryName,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    const result = response.data;
    return result.message;
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};

export const categoryDelete = async (categoryId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.delete(`/category/${categoryId}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    const result = response.data;
    return result.message;
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};

export const postCreate = async (bookmark, categoryId, memo, title, url) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.post(
      '/post',
      {
        bookmark: bookmark,
        categoryId: categoryId,
        memo: memo,
        title: title,
        url: url,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    const result = response.data;
    return result.message;
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};

export const getCategoryAndPostData = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.get('/posts', {
      headers: {
        Authorization: accessToken,
      },
    });

    const result = response.data;
    return {
      message: result.message,
      categoryData: result.data.categoryDtoList,
      postData: result.data.postDtoList.content,
    };
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};
