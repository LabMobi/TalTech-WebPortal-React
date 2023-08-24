import React from "react";
import TextInput from "../textInput";
import { setToMinMax } from "../../helpers/helpers";
import "./style.css";
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
          slicer({ value, func: onDayChange, sliceTo: 2, min: 1, max: 31 })
        }
        placeholder={"dd"}
        inputSelectionClassName="text-date-picker-day-input"
        labelClassName={labelClassName}
        label={label}
        inputProps={{
          onBlur: () => onDayChange(padSingleDigit(dayValue, 1, 31)),
        }}
      />
      <TextInput
        inputProps={{
          onBlur: () => onMonthChange(padSingleDigit(monthValue, 1, 12)),
        }}
        onChange={(value) =>
          slicer({ value, func: onMonthChange, sliceTo: 2, min: 1, max: 12 })
        }
        type={"number"}
        value={monthValue}
        placeholder={"mm"}
        inputSelectionClassName="text-date-picker-month-input"
      />
      <TextInput
        inputProps={{
          onBlur: () => onYearChange(setToMinMax(yearValue, 1950, 2020)),
        }}
        type={"number"}
        onChange={(value) =>
          slicer({
            value,
            func: onYearChange,
            sliceTo: 4,
            min: 1950,
            max: 2020,
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
