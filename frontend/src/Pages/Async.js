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
    return {
      message: result.message,
      postId: result.data.postId,
      title: result.data.title,
      memo: result.data.memo,
      url: result.data.url,
      bookmark: result.data.bookmark,
      nickname: result.data.nickname,
      updatedAt: result.data.updatedAt,
      categoryName: result.data.categoryName,
      storeFileName: result.data.storeFileName,
      categoryId: result.data.categoryId,
    };
  } catch (error) {
    const result = error.response.data;
    return result.message;
  }
};

export const postDelete = async (postId) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.delete(
      `/post/${postId}`,
      {
        postId: postId,
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

export const postEdit = async (
  postId,
  bookmark,
  categoryId,
  memo,
  title,
  url
) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.put(
      `/post/${postId}`,
      {
        postId: postId,
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
    return {
      message: result.message,
      newCategoryId: result.data.categoryId,
    };
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