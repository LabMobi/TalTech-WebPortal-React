import React from "react";
import ReactDatePicker from "react-datepicker";
import { ReactComponent as CalendarIcon } from "./../../assets/svg/CalendarIcon.svg";
import "./style.css";
import { Form, Text } from "taltech-styleguide";
const CustomDatePicker = ({ value, onChange, label, labelStyle }) => {
  return (
    <div className="d-flex">
      <Form.Label className="text-input-label d-flex align-items-center">
        <Text color="primary"> {label}: </Text>
      </Form.Label>
      <div className="custom-date-picker-container">
        <ReactDatePicker
          className="custom-date-picker"
          selected={value}
          onChange={(val) => onChange(val)}
        />
        <div className="custom-date-picker-calendar-icon">
          <CalendarIcon />
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
