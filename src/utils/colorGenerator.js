export const randomColor = (opacity) => {
  const random = Math.random() * 256;
  return rgba(random, random, random, opacity);
};

console.log(randomColor(1))