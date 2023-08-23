import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TTNewButton, Text, Input, Form } from "taltech-styleguide";
import "./loginWithEmail.css";
import { getCurrentLanguage } from "../../localization/i18n.config";

const LoginWithEmail = ({ setIsOTPSent }) => {
  const { t } = useTranslation();
  const currentLanguage = getCurrentLanguage();
  const onSendOTP = () => {
    setIsOTPSent(true);
  };
  const [email, setEmail] = useState("");
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
        onSubmit={(event) => {
          event.preventDefault();
          onSendOTP();
        }}
        style={{ marginTop: 16 }}
      >
        <Form.Label>{t("enter-your-email")}</Form.Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          className="login-email-input"
          size="sm"
          label={t("enter-your-email")}
          default
          placeholder=""
        />
      </Form>
      <TTNewButton
        value={email}
        disabled={email.length < 5}
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
