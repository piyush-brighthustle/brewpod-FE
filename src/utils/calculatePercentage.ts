const calculatePercentage = (fullValue: number, value: number) => {
  return Math.round((value / fullValue) * 100);
};

export { calculatePercentage };
