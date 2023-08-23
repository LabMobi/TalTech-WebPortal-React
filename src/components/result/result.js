import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TTNewButton, Text } from "taltech-styleguide";
import { LOGOUT } from "../../redux/actions/types";
import { actionCreator } from "../../redux/actions/common.actions";

const Result = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem("appState");
    dispatch(actionCreator(LOGOUT));
  };
  return (
    <div>
      <Text as="h3">{t("result.formSent")}</Text>
      <Text color="primary" as="p">
        {t("result.safelyLogout")}
      </Text>
      <TTNewButton onClick={onLogout} style={{ marginTop: 40 }}>
        {t("logout")}
      </TTNewButton>
    </div>
  );
};

export default Result;
