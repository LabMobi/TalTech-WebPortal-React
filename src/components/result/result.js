import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TTNewButton, Text } from "taltech-styleguide";
import "./style.css";
import { logout } from "../../redux/actions/app.actions";
const Result = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem("appState");
    dispatch(logout());
  };
  return (
    <div>
      <Text as="h3">{t("result.formSent")}</Text>
      <Text color="primary" as="p">
        {t("result.safelyLogout")}
      </Text>
      <TTNewButton onClick={onLogout} className="logout-button">
        {t("logout")}
      </TTNewButton>
    </div>
  );
};

export default Result;
