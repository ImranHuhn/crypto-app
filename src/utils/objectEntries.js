export const getTimeOrPrice = (data) => {
  const newData = data?.reduce(
    (acc, el) => {
      acc.time.push(el[0]);
      acc.price.push(el[1]);
      return acc;
    },
    { time: [], price: [] }
  );
  return newData;
};
