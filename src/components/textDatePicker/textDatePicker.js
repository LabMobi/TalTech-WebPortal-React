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
  function padSingleDigit(value, min, max) {
    if (value.length === 0) {
      value = "1";
    }
    if (value.length === 1) {
      value = "0" + value;
      return setToMinMax(value, min, max);
    } else {
      return setToMinMax(value, min, max);
    }
  }
  const slicer = (payload) => {
    const { func, sliceTo } = payload;
    let { value } = payload;
    console.log("value: ", value);
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
