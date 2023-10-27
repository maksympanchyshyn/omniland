export const toFixedNoRounding = (value: number | string, decimals: number) => {
  const str = `${value}`;
  return str.slice(0, str.indexOf('.') + decimals + 1);
};
