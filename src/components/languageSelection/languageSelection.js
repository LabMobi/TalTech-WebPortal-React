import React from "react";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../localization/i18n.config"; // Importing the getCurrentLanguage function from localization
import "./languageSelection.css"; // Importing styles
import { TTNewButton, Text } from "taltech-styleguide"; // Importing components from "taltech-styleguide"
import { useDispatch } from "react-redux"; // Importing useDispatch from "react-redux"
import { setLanguage } from "../../redux/actions/app.actions";

// LanguageSelection component
const LanguageSelection = () => {
  const { i18n } = useTranslation(); // Using the useTranslation hook from react-i18next
  const onChange = (lang) => i18n.changeLanguage(lang); // Function to change the language
  const dispatch = useDispatch(); // Initializing the useDispatch hook

  // Language options array
  const languageOptions = [
    {
      name: "EST",
      key: "est",
      isSelected: getCurrentLanguage() === "est", // Checking if the language is currently selected
      onSelect: () => {
        onChange("est"); // Changing the language to "est"
        dispatch(setLanguage("est")); // Dispatching an action to set the language in Redux
      },
    },
    {
      name: "ENG",
      key: "en",
      isSelected: getCurrentLanguage() === "en", // Checking if the language is currently selected
      onSelect: () => {
        onChange("en"); // Changing the language to "en"
        dispatch(setLanguage("en")); // Dispatching an action to set the language in Redux
      },
    },
  ];

  return (
    <div className="langauge-options-container">
      {languageOptions.map((option) => {
        return (
          <TTNewButton
            noStyle
            variant=""
            onClick={option.onSelect} // Setting the onClick handler to change the language
            key={option.key}
            className="language-selection-option-button"
          >
            <Text
              color={option.isSelected ? "secondary" : "white"}
              as="p"
              className={`language-selection-option ${
                option.isSelected ? "language-option-selected" : ""
              }`}
            >
              {option.name}
            </Text>
          </TTNewButton>
        );
      })}
    </div>
  );
};

export default LanguageSelection; // Exporting the LanguageSelection component
