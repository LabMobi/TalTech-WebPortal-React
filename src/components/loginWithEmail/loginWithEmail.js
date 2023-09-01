/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TTNewButton,
  Text,
  Input,
  Form,
  FormFeedback,
} from "taltech-styleguide";
import "./loginWithEmail.css";
import { getCurrentLanguage } from "../../localization/i18n.config";
import { checkEmailFormat } from "../../helpers/helpers";
import HttpClient from "../../api/httpclient";
import { setLoading } from "../../redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";

const LoginWithEmail = ({ setIsOTPSent, email, setEmail }) => {
  const { t } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  const [showEmailFormatError, setShowEmailFormatError] = useState(false);
  const { loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const onSendOTP = async () => {
    try {
      dispatch(setLoading(true));

      const response = await HttpClient.Post("/login-otp", {
        email,
      });

      setIsOTPSent(true);
    } catch (error) {
      console.error("An error occurred while loginOTP:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onBlurEmail = () => {
    if (checkEmailFormat(email)) {
      setShowEmailFormatError(false);
    } else {
      setShowEmailFormatError(true);
    }
  };
  return (
    <div className="login-option-container">
      <Text as="h4">{t("email")}</Text>
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
          sisselogimiseks saadame Teile kontrollkoodi postkasti. Sisestage oma
          e-postiaadress ja vajutage "Saada". Seejärel sisestage kontrollkood.
        </Text>
      ) : (
        <Text
          color={"primary"}
          as="p"
          className="login-option-description-text"
        >
          To log in to{" "}
          <Text as="span" className="bold-text" color={"primary"}>
            TalTech and the authentication service,{" "}
          </Text>
          we will send you a verification code to your mailbox. Enter your email
          address and press "Send". Then enter the verification code.
        </Text>
      )}
      <Form
        className="email-login-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSendOTP();
        }}
      >
        <Form.Label>{t("enter-your-email")}</Form.Label>
        <Input
          onBlur={onBlurEmail}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="login-email-input"
          size="sm"
          label={t("enter-your-email")}
          default
          placeholder=""
        />
        {showEmailFormatError && (
          <FormFeedback type="danger">{t("wrongEmailFormat")}</FormFeedback>
        )}
      </Form>

      <TTNewButton
        isLoading={loading}
        value={email}
        disabled={!checkEmailFormat(email)}
        onClick={onSendOTP}
        className="login-continue-button"
        variant="secondary"
      >
        {t("saada")}
      </TTNewButton>
    </div>
  );
};

export default LoginWithEmail;
