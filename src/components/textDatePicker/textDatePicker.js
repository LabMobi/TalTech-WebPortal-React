import React from "react";
import TextInput from "../textInput";
import { setToMinMax } from "../../helpers/helpers";
import "./style.css";
import {
  MAX_DAY,
  MAX_MONTH,
  MAX_YEAR,
  MIN_DAY,
  MIN_MONTH,
  MIN_YEAR,
} from "../../constants/constants";

/**
 * A custom date picker component that allows input for day, month, and year.
 * @param {Object} props - Component props.
 * @param {function} props.onDayChange - Function to handle day value change.
 * @param {function} props.onMonthChange - Function to handle month value change.
 * @param {function} props.onYearChange - Function to handle year value change.
 * @param {string} props.dayValue - The value of the day input.
 * @param {string} props.monthValue - The value of the month input.
 * @param {string} props.yearValue - The value of the year input.
 * @param {string} props.label - The label for the date picker.
 * @param {string} props.labelClassName - CSS class for the label.
 * @returns {JSX.Element} The rendered JSX element.
 */
const TextDatePicker = ({
  onDayChange,
  onMonthChange,
  onYearChange,
  dayValue,
  monthValue,
  yearValue,
  label,
  labelClassName,
}) => {
  // Function to pad a single digit value with leading "0" and ensure it's within min-max range.
  function padSingleDigit(value, min, max) {
    // If the value is empty, set it to "1"
    if (!value || value.length === 0) {
      value = "1";
    }
    // If the value has only one digit, add a leading "0"
    if (value.length === 1) {
      value = "0" + value;
      // Ensure the value is within the specified min-max range using the setToMinMax function
      return setToMinMax(value, min, max); // Using the setToMinMax function to ensure value is within min-max range
    } else {
      // Ensure the value is within the specified min-max range using the setToMinMax function
      return setToMinMax(value, min, max);
    }
  }

  // Function to slice value and call respective change function
  const slicer = (payload) => {
    const { func, sliceTo } = payload;
    let { value } = payload;
    if (value.length > sliceTo) {
      value = value.slice(0, sliceTo);
    }
    func(value);
  };

  return (
    <div className="text-date-picker-container d-flex ">
      <TextInput
        containerClassName={"text-date-picker-day-container"}
        value={dayValue}
        type={"number"}
        onChange={(value) =>
          slicer({
            value,
            func: onDayChange,
            sliceTo: 2,
            min: MIN_DAY,
            max: MAX_DAY,
          })
        }
        placeholder={"dd"}
        inputSelectionClassName="text-date-picker-day-input"
        labelClassName={labelClassName}
        label={label}
        inputProps={{
          onBlur: () => onDayChange(padSingleDigit(dayValue, MIN_DAY, MAX_DAY)),
        }}
      />
      <TextInput
        inputProps={{
          onBlur: () =>
            onMonthChange(padSingleDigit(monthValue, MIN_MONTH, MAX_MONTH)),
        }}
        onChange={(value) =>
          slicer({
            value,
            func: onMonthChange,
            sliceTo: 2,
            min: MIN_MONTH,
            max: MAX_MONTH,
          })
        }
        type={"number"}
        value={monthValue}
        placeholder={"mm"}
        inputSelectionClassName="text-date-picker-month-input"
      />
      <TextInput
        inputProps={{
          onBlur: () =>
            onYearChange(setToMinMax(yearValue, MIN_YEAR, MAX_YEAR)),
        }}
        type={"number"}
        onChange={(value) =>
          slicer({
            value,
            func: onYearChange,
            sliceTo: 4,
            min: MIN_YEAR,
            max: MAX_YEAR,
          })
        }
        value={yearValue}
        placeholder={"yyyy"}
        inputSelectionClassName="text-date-picker-year-input"
      />
    </div>
  );
};

export default TextDatePicker;
