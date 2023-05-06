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
export default validateId;
