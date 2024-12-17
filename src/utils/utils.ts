export const validateForm = (name: string, value: number) => {
  if (name === 'chargePoints') {
    console.log(typeof value);
    if (value > 20) {
      return 20;
    } else if (value >= 1) {
      return value;
    } else {
      return 1;
    }
  }
};
