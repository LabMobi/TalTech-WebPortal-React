import React from "react";
import { Form, FormFeedback, Input, Text, Typeahead } from "taltech-styleguide";
import "./textInput.css";
import { useTranslation } from "react-i18next";
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
  inputProps,
  showFeedback,
  errorMessage,
}) => {
  const inputStyle = {
    width: 226,
    height: 40,
    borderRadius: 4,
    border: "1px solid #6e7184",
    gap: 10,

    ...inputContainerStyle,
  };
  const { t } = useTranslation();
  return (
    <div className="d-flex input-label-container" style={containerStyle}>
      {label && (
        <Form.Label
          className="text-input-label d-flex align-items-start"
          style={{ margin: 0, ...labelStyle }}
        >
          <Text color="primary"> {label}: </Text>
          <Text className="text-input-required-star" color="danger">
            {required ? "*" : ""}
          </Text>
        </Form.Label>
      )}
      {isSelection ? (
        <div style={{ zIndex: 99999 }}>
          <Typeahead
            placeholder={t("select")}
            style={inputStyle}
            id={"typehead"}
            value={value}
            onChange={(e) => onChange(e[0])}
            options={selectionData.map((e) => {
              return e[fieldName];
            })}
          />
        </div>
      ) : (
        <div>
          <Input
            {...inputProps}
            type={type ? type : ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={label}
            style={inputStyle}
            placeholder={placeholder}
          />
          {showFeedback && (
            <FormFeedback type="danger">{errorMessage}</FormFeedback>
          )}
        </div>
      )}
    </div>
  );
};

export default TextInput;

/* <Input
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
        </Input> */
