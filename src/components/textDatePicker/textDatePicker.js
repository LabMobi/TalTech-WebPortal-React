import React from "react";
import TextInput from "../textInput";
import { setToMinMax } from "../../helpers/helpers";
import "./style.css";
import useIsMobile from "../../hooks/useIsMobile";
import useWindowDimensions from "../../hooks/useWindowDimensions";
const TextDatePicker = ({
  onDayChange,
  onMonthChange,
  onYearChange,
  dayValue,
  monthValue,
  yearValue,
  label,
  labelStyle,
}) => {
  function padSingleDigit(value, min, max) {
    if (value.length === 0) {
      value = "1";
    }
    debugger;
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

  const { isMobile } = useIsMobile();
  const mobileStyle = isMobile ? { containerStyle: { width: 53 } } : {};
  const { width } = useWindowDimensions();
  const containerStyle =
    width < 860
      ? { flexDirection: "column", width: 52 }
      : { flexDirection: "row" };

  return (
    <div className="text-date-picker-container d-flex ">
      <TextInput
        containerStyle={containerStyle}
        value={dayValue}
        type={"number"}
        onChange={(value) =>
          slicer({ value, func: onDayChange, sliceTo: 2, min: 1, max: 31 })
        }
        placeholder={"dd"}
        {...mobileStyle}
        inputContainerStyle={{ width: 53 }}
        labelStyle={{ ...labelStyle }}
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
        inputContainerStyle={{
          width: 53,
          marginLeft: 6,
          paddingLeft: 10,
          min: 1,
          max: 12,
        }}
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
        inputContainerStyle={{ width: 108, marginLeft: 6 }}
      />
    </div>
  );
};

export default TextDatePicker;
