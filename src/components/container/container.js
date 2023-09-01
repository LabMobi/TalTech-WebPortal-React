import React from "react";
import "./container.css";
import { useTranslation } from "react-i18next";
import { Loader, TTNewButton, Text } from "taltech-styleguide";
import { useSelector } from "react-redux";
import useSaveUser from "../../hooks/useSaveUser";
const Container = ({ children }) => {
  const { t } = useTranslation();
  const { isLoggedIn, formPage, userInfoLoading, userFilesLoading } =
    useSelector((state) => state.app);
  const appState = useSelector((state) => state.app);
  const isSaveButtonVisible = isLoggedIn && formPage !== "result";
  const { saveUser, isSavingLoading, isSaved } = useSaveUser();

  // Function to handle save action
  const onSave = async () => {
    await saveUser(appState, "save");
  };

  return (
    <div className="container">
      {(userInfoLoading || userFilesLoading) && (
        <Loader className="taltech-loader" />
      )}

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
