import React, { useMemo, useState } from "react";
import { Form, TTNewButton, Text } from "taltech-styleguide";
import TextInput from "../../textInput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../../../redux/actions/common.actions";
import {
  SET_FORM_PAGE,
  UPDATE_FORM_FIELDS,
} from "../../../redux/actions/types";
import { phoneCodes } from "../../../constants/phoneCodes";
import InAdsWidget from "../../inADSWidget/inADSWidget";
import "./style.css";
import { checkEmailFormat } from "../../../helpers/helpers";
const Page2 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields, formPage } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(actionCreator(UPDATE_FORM_FIELDS, payload));
  };
  const onContinue = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 3));
  };
  const onBack = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 1));
  };
  const canContinue = useMemo(() => {
    if (
      formFields.phoneCode &&
      formFields.phoneNumber &&
      checkEmailFormat(formFields.email) &&
      formFields.residentalAddress
    ) {
      return true;
    }
    return false;
  }, [
    formFields.email,
    formFields.phoneCode,
    formFields.phoneNumber,
    formFields.residentalAddress,
  ]);
  const [showEmailFormatError, setShowEmailFormatError] = useState(false);
  const onBlurEmail = () => {
    if (checkEmailFormat(formFields.email)) {
      setShowEmailFormatError(false);
    } else {
      setShowEmailFormatError(true);
    }
  };

  return (
    <div>
      <Text as="h3">{t("form.page2.title")}</Text>
      <Form
        className="page-form-container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="d-flex phone-number-container">
          <TextInput
            inputSelectionClassName={"phone-area-input"}
            isSelection
            selectionData={phoneCodes}
            value={formFields.phoneCode}
            onChange={(val) => updateFormFields({ phoneCode: val })}
            label={t("form.page2.telefon")}
            fieldName={"dial_code"}
          />
          <TextInput
            inputSelectionClassName={"phone-number-input"}
            type={"number"}
            value={formFields.phoneNumber}
            onChange={(val) => updateFormFields({ phoneNumber: val })}
          />
        </div>
        <TextInput
          inputProps={{ onBlur: onBlurEmail }}
          value={formFields.email}
          onChange={(val) => updateFormFields({ email: val })}
          label={t("email")}
          showFeedback={showEmailFormatError}
          errorMessage={t("wrongEmailFormat")}
          inputSelectionClassName={"page2-email-input"}
        />

        <InAdsWidget
          selectedAddress={formFields.residentalAddress}
          formPage={formPage}
          label={t("form.page2.residentalAddress")}
          onAddressSelect={(val) =>
            updateFormFields({ residentalAddress: val })
          }
        />
        <div className="page2-bottom-button-container">
          <TTNewButton variant="outline" onClick={onBack}>
            {t("back")}
          </TTNewButton>
          <TTNewButton
            className="page2-continue-button"
            onClick={onContinue}
            disabled={!canContinue}
          >
            {t("continue")}
          </TTNewButton>
        </div>
      </Form>
    </div>
  );
};

export default Page2;
