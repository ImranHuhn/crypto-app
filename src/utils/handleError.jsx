export const handleError = async (callback) => {
  try {
    await callback();
  } catch (error) {
    alert(error.message);
  }
};
