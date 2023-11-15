import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TTNewButton,
  Text,
  Input,
  Form,
  FormFeedback,
} from "taltech-styleguide";
import "./otpLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "../../redux/actions/app.actions";

const OTPLogin = ({ setIsOTPSent, email }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const { loading } = useSelector((state) => state.app);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  const onError = (errorMsg) => {
    setOtpErrorMessage(errorMsg);
  };

  const onContinue = () => {
    dispatch(verifyOTP({ email, otp }, t, onError));
  };

  const onCancelOTP = () => {
    setIsOTPSent(false);
  };
  return (
    <div className="login-option-container">
      <Text as="h4">{t("email")}</Text>

      <Text color={"primary"} as="p" className="login-option-description-text">
        {t("otpLoginDescription")}
      </Text>

      <Form
        className="email-login-form"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
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
        {otpErrorMessage && (
          <FormFeedback type="danger">{otpErrorMessage}</FormFeedback>
        )}
      </Form>
      <div className="d-flex align-items-center">
        <TTNewButton
          isLoading={loading}
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
