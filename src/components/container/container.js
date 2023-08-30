import React, { useState } from "react";
import "./container.css";
import { useTranslation } from "react-i18next";
import { TTNewButton, Text } from "taltech-styleguide";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../../redux/actions/common.actions";
import { LOGOUT } from "../../redux/actions/types";
const Container = ({ children }) => {
  const { t } = useTranslation();
  const { isLoggedIn, formPage } = useSelector((state) => state.app);
  const appState = useSelector((state) => state.app);
  const isSaveButtonVisible = isLoggedIn && formPage !== "result";
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  // Function to handle save action
  const onSave = () => {
    setIsSavingLoading(true);
    const objectString = JSON.stringify(appState);
    localStorage.setItem("appState", objectString);
    setTimeout(() => {
      setIsSavingLoading(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        dispatch(actionCreator(LOGOUT));
      }, 2000);
    }, 2500);
  };

  return (
    <div className="container">
      <div className="container-title-text d-flex  justify-content-between">
        <Text as="h1" className="app-form-title-text">
          {t("app.form.title")}
        </Text>

        {isSaveButtonVisible && (
          <TTNewButton
            isLoading={isSavingLoading}
            onClick={onSave}
            className="container-save-button"
            variant={isSaved ? "success" : "outline"}
          >
            <Text as="p" className="save-and-leave-text">
              {isSaved ? t("saved") : t("saveAndLeave")}
            </Text>
          </TTNewButton>
        )}
      </div>
      <div className="container-content">{children}</div>
    </div>
  );
};

export default Container;
