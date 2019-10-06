export const getRandomIndex = (array: any[]) => {
  return ~~(Math.random() * array.length);
};

export const getRandomItem = (array: any[]) => {
  const index = ~~(Math.random() * array.length);
  return array[index];
};
