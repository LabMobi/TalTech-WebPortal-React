import React from "react";
import { useTranslation } from "react-i18next";
import { TTNewButton, Text } from "taltech-styleguide";
import "./loginWithIDCard.css";
import { getCurrentLanguage } from "../../localization/i18n.config";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/actions/app.actions";
const LoginWithIDCard = () => {
  const { t } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  const dispatch = useDispatch();
  const onContinue = () => {
    dispatch(setLogin({ isLoggedIn: true }));
  };
  return (
    <div className="login-option-container">
      <Text as="h4">{t("id-card")}</Text>
      {currentLanguage === "est" ? (
        <Text
          color={"primary"}
          as="p"
          className="login-option-description-text"
        >
          Teenusesse{" "}
          <Text as="span" className="bold-text" color={"primary"}>
            TalTech ja autentimise teenus{" "}
          </Text>
          sisselogimiseks vajate kaardilugejat ja kehtivat ID-kaarti. Sisestage
          ID-kaart kaardilugejasse ja vajutage "Jätka".
        </Text>
      ) : (
        <Text
          color={"primary"}
          as="p"
          className="login-option-description-text"
        >
          You need a card reader and a valid ID card to log in to{" "}
          <Text as="span" className="bold-text" color={"primary"}>
            TalTech and the authentication service.{" "}
          </Text>
          Insert the ID card into the card reader and press "Continue".
        </Text>
      )}
      <TTNewButton
        onClick={onContinue}
        className="login-continue-button"
        variant="secondary"
      >
        {t("continue")}
      </TTNewButton>
    </div>
  );
};

export default LoginWithIDCard;
