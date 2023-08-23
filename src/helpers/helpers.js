const setToMinMax = (value, min, max) => {
  if (Number(value) < min) {
    return String(min);
  }
  if (Number(value) > max) {
    return String(max);
  } else {
    return value;
  }
};
function checkEmailFormat(emailInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailInput);
}

export { setToMinMax, checkEmailFormat };
