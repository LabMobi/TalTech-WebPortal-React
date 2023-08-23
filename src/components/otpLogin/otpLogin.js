import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TTNewButton, Text, Input, Form } from "taltech-styleguide";
import "./otpLogin.css";
import { SET_LOGIN } from "../../redux/actions/types";
import { actionCreator } from "../../redux/actions/common.actions";
import { useDispatch } from "react-redux";

const OTPLogin = ({ setIsOTPSent }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch(actionCreator(SET_LOGIN, true));
  };
  const onCancelOTP = () => {
    setIsOTPSent(false);
  };
  const [otp, setOTP] = useState("");

  return (
    <div className="login-option-container">
      <Text as="h4">{t("email")}</Text>

      <Text color={"primary"} as="p" className="login-option-description-text">
        {t("otpLoginDescription")}
      </Text>

      <Form
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
        style={{ marginTop: 16 }}
      >
        <Form.Label>{t("enterOTP")}</Form.Label>
        <Input
          onChange={(e) => setOTP(e.target.value)}
          className="login-email-input"
          size="sm"
          label={t("enter-your-email")}
          default
          placeholder=""
        />
      </Form>
      <div className="d-flex align-items-center">
        <TTNewButton
          value={otp}
          disabled={otp.length < 4}
          onClick={onContinue}
          className="login-continue-button"
          variant="secondary"
        >
          {t("continue")}
        </TTNewButton>
        <TTNewButton
          value={otp}
          onClick={onCancelOTP}
          variant="link"
          className="otp-cancel-button"
        >
          <Text color="secondary">{t("cancel")}</Text>
        </TTNewButton>
      </div>
    </div>
  );
};

export default OTPLogin;
