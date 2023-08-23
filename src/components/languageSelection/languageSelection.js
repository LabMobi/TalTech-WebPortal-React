import React from "react";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../localization/i18n.config";
import "./languageSelection.css";
import { TTNewButton, Text } from "taltech-styleguide";
import { useDispatch } from "react-redux";
import { actionCreator } from "../../redux/actions/common.actions";
import { SET_LANGUAGE } from "../../redux/actions/types";

const LanguageSelection = () => {
  const { i18n } = useTranslation();
  const onChange = (lang) => i18n.changeLanguage(lang);
  const dispatch = useDispatch();

  const languageOptions = [
    {
      name: "EST",
      key: "est",
      isSelected: getCurrentLanguage() === "est",
      onSelect: () => {
        onChange("est");
        dispatch(actionCreator(SET_LANGUAGE, "est"));
      },
    },
    {
      name: "ENG",
      key: "en",
      isSelected: getCurrentLanguage() === "en",
      onSelect: () => {
        onChange("en");
        dispatch(actionCreator(SET_LANGUAGE, "en"));
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
            onClick={option.onSelect}
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

export default LanguageSelection;
