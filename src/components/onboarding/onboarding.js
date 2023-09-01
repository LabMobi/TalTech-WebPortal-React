import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./onboarding.css";
import { TTNewButton, Text } from "taltech-styleguide";
import { LOGIN_OPTIONS } from "../../constants/enums";
import LoginWithIDCard from "../loginWithIDCard";
import { useDispatch, useSelector } from "react-redux";
import LoginWithEmail from "../loginWithEmail";
import OTPLogin from "../otpLogin/otpLogin";
import { setSelectedLoginOption } from "../../redux/actions/app.actions";
const Onboarding = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const onSelectLoginOption = (option) => {
    dispatch(setSelectedLoginOption(option));
  };
  const { selectedLoginOption } = useSelector((state) => state.app);
  const [isOTPSent, setIsOTPSent] = useState(false);

  return (
    <div className="onboarding-container">
      <Text as="h3" className="login-options-title">
        {t("login-options")}
      </Text>
      {!isOTPSent && (
        <>
          <TTNewButton
            onClick={() => onSelectLoginOption(LOGIN_OPTIONS.IDCARD)}
          >
            {t("id-card")}
          </TTNewButton>
          <TTNewButton
            onClick={() => onSelectLoginOption(LOGIN_OPTIONS.EMAIL)}
            className="login-email-button"
            variant="outline"
          >
            {t("email")}
          </TTNewButton>
        </>
      )}
      {selectedLoginOption === LOGIN_OPTIONS.IDCARD && <LoginWithIDCard />}
      {selectedLoginOption === LOGIN_OPTIONS.EMAIL && !isOTPSent && (
        <LoginWithEmail
          email={email}
          setEmail={setEmail}
          setIsOTPSent={setIsOTPSent}
        />
      )}
      {selectedLoginOption === LOGIN_OPTIONS.EMAIL && isOTPSent && (
        <OTPLogin email={email} setIsOTPSent={setIsOTPSent} />
      )}
    </div>
  );
};

export default Onboarding;
