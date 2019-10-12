export const mutate = ({ step, min, max }) => (random: any) => (
  value: number
): number => {
  value = value + random() * step * 2 - step;
  return Math.min(Math.max(value, min), max);
};
