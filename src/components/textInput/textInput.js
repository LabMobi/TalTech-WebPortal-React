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
  isSelection = false,
  selectionData,
  type,
  fieldName,
  inputProps,
  showFeedback,
  errorMessage,
  selectionInputClassName,
  containerClassName,
  inputSelectionClassName,
  labelClassName,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`d-flex input-label-container ${
        containerClassName ? containerClassName : ""
      }`}
    >
      {label && (
        <Form.Label
          className={`text-input-label d-flex align-items-start ${labelClassName}`}
        >
          <Text color="primary">
            {label}:{" "}
            <Text as="span" className="text-input-required-star" color="danger">
              {required ? "*" : ""}
            </Text>
          </Text>
        </Form.Label>
      )}
      {isSelection ? (
        <div className={selectionInputClassName ? selectionInputClassName : ""}>
          <Typeahead
            className={`text-input-selection-component ${
              inputSelectionClassName ? inputSelectionClassName : ""
            }`}
            selected={value ? [value] : []}
            placeholder={t("select")}
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
            placeholder={placeholder}
            className={`text-input-selection-component ${
              inputSelectionClassName ? inputSelectionClassName : ""
            }`}
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
