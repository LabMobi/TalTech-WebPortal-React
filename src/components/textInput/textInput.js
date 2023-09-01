import React from "react";
import { Form, FormFeedback, Input, Text, Typeahead } from "taltech-styleguide";
import "./textInput.css";
import { useTranslation } from "react-i18next";

/**
 * A custom text input component.
 * @param {Object} props - Component props.
 * @param {string} props.label - The label for the input.
 * @param {function} props.onChange - Function to handle input changes.
 * @param {string} props.value - The value of the input.
 * @param {string} props.placeholder - Placeholder text for the input.
 * @param {boolean} props.required - Indicates if the input is required (default is true).
 * @param {boolean} props.isSelection - Indicates if it's a selection input.
 * @param {Array} props.selectionData - Data for selection input.
 * @param {string} props.type - The type of the input (e.g., "text", "password").
 * @param {string} props.fieldName - Field name for selection data.
 * @param {Object} props.inputProps - Additional input properties.
 * @param {boolean} props.showFeedback - Indicates whether to show feedback (e.g., error message).
 * @param {string} props.errorMessage - Error message to display if there is an error.
 * @param {string} props.selectionInputClassName - CSS class for the selection input container.
 * @param {string} props.containerClassName - CSS class for the component's container.
 * @param {string} props.inputSelectionClassName - CSS class for the input or selection input.
 * @param {string} props.labelClassName - CSS class for the input label.
 * @returns {JSX.Element} The rendered JSX element.
 */
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
