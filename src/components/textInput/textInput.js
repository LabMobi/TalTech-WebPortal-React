import React from "react";
import { Form, Input, Text } from "taltech-styleguide";
import "./textInput.css";
const TextInput = ({
  label,
  onChange,
  value,
  placeholder,
  required = true,
  containerStyle,
  isSelection = false,
  selectionData,
  inputContainerStyle,
  type,
  labelStyle,
  fieldName,
}) => {
  const inputStyle = {
    width: 226,
    height: 40,
    borderRadius: 4,
    border: "1px solid #6e7184",
    gap: 10,

    ...inputContainerStyle,
  };
  return (
    <div style={containerStyle} className="d-flex">
      {label && (
        <Form.Label
          className="text-input-label d-flex align-items-center"
          style={{ margin: 0, ...labelStyle }}
        >
          <Text color="primary"> {label}: </Text>
          <Text className="text-input-required-star" color="danger">
            {required ? "*" : ""}
          </Text>
        </Form.Label>
      )}
      {isSelection ? (
        <Input
          as="select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label={label}
          style={inputStyle}
          placeholder={placeholder}
        >
          {selectionData.map((e) => {
            return <option key={e.key}>{e[fieldName]}</option>;
          })}
        </Input>
      ) : (
        <Input
          type={type ? type : ""}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label={label}
          style={inputStyle}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default TextInput;
