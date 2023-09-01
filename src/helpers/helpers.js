/**
 * A function that keeps a value within the specified minimum and maximum range.
 * @param {number} value - The value to be processed.
 * @param {number} min - The desired minimum value.
 * @param {number} max - The desired maximum value.
 * @returns {string|number} - Value constrained within the minimum and maximum range.
 */
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

/**
 * Checks if an email address follows a valid format.
 * @param {string} emailInput - The email address to be checked.
 * @returns {boolean} - True if the email format is valid, otherwise false.
 */
function checkEmailFormat(emailInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailInput);
}

/**
 * Checks if a specific field is filled for every element in the array.
 * @param {Array} array - The array of objects to be checked.
 * @param {string} field - The field name to be checked in each object.
 * @returns {boolean} - True if the specified field is filled for all elements, otherwise false.
 */
const checkEveryFieldFilled = (array, field) => {
  return array.every((e) => {
    if (e[field]) {
      return true;
    } else {
      return false;
    }
  });
};

export { setToMinMax, checkEmailFormat, checkEveryFieldFilled };
