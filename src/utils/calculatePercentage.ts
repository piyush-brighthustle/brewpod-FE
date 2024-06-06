const calculatePercentage = (fullValue: number, value: number) => {
  if (fullValue === 0 || value === 0) return 0;
  return Math.round((value / fullValue) * 100);
};

export { calculatePercentage };
