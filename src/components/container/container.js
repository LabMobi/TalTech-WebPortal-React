import React, { useState } from "react";
import "./container.css";
import { useTranslation } from "react-i18next";
import { TTNewButton, Text } from "taltech-styleguide";
import { useSelector } from "react-redux";
const Container = ({ children }) => {
  const { t } = useTranslation();
  const { isLoggedIn, formPage } = useSelector((state) => state.app);
  const appState = useSelector((state) => state.app);
  const isSaveButtonVisible = isLoggedIn && formPage !== "result";
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => {
    setIsSavingLoading(true);
    const objectString = JSON.stringify(appState);
    localStorage.setItem("appState", objectString);
    setTimeout(() => {
      setIsSavingLoading(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 5000);
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
            style={{ marginTop: 36 }}
            variant={isSaved ? "success" : "outline"}
          >
            {t("saveAndLeave")}
          </TTNewButton>
        )}
      </div>
      <div className="container-content">{children}</div>
    </div>
  );
};

export default Container;
