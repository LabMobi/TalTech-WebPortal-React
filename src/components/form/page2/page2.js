import React, { useMemo } from "react";
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
      formFields.email &&
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
  return (
    <div>
      <Text as="h3">{t("form.page2.title")}</Text>
      <Form
        style={{ marginTop: 32 }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="d-flex">
          <TextInput
            inputContainerStyle={{ width: 110 }}
            isSelection
            selectionData={phoneCodes}
            value={formFields.phoneCode}
            onChange={(val) => updateFormFields({ phoneCode: val })}
            label={t("form.page2.telefon")}
            fieldName={"dial_code"}
          />
          <TextInput
            inputContainerStyle={{ marginLeft: 6, width: 110 }}
            value={formFields.phoneNumber}
            onChange={(val) => updateFormFields({ phoneNumber: val })}
          />
        </div>
        <TextInput
          value={formFields.email}
          onChange={(val) => updateFormFields({ email: val })}
          label={t("email")}
        />

        <InAdsWidget
          selectedAddress={formFields.residentalAddress}
          formPage={formPage}
          label={t("form.page2.residentalAddress")}
          onAddressSelect={(val) =>
            updateFormFields({ residentalAddress: val })
          }
        />

        <TTNewButton variant="outline" onClick={onBack}>
          {t("back")}
        </TTNewButton>
        <TTNewButton
          style={{ marginLeft: 16 }}
          onClick={onContinue}
          disabled={!canContinue}
        >
          {t("continue")}
        </TTNewButton>
      </Form>
    </div>
  );
};

export default Page2;
