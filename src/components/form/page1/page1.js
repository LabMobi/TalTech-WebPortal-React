import React, { useMemo } from "react";
import { CustomInput, Form, TTNewButton, Text } from "taltech-styleguide";
import TextInput from "../../textInput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../../../redux/actions/common.actions";
import {
  SET_FORM_PAGE,
  UPDATE_FORM_FIELDS,
} from "../../../redux/actions/types";
import "./page1.css";
import TextDatePicker from "../../textDatePicker/textDatePicker";
const Page1 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(actionCreator(UPDATE_FORM_FIELDS, payload));
  };

  const onContinue = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 2));
  };

  const canContinue = useMemo(() => {
    if (
      (!formFields.doNotHaveAnIDNumber &&
        formFields.name &&
        formFields.surname &&
        formFields.nationality &&
        formFields.countryOfTaxResidence &&
        formFields.iban) ||
      (formFields.doNotHaveAnIDNumber &&
        formFields.dayOfbirthday &&
        formFields.monthOfbirthday &&
        formFields.yearOfBirthday &&
        (formFields.woman || formFields.man))
    ) {
      return true;
    }
    return false;
  }, [
    formFields.countryOfTaxResidence,
    formFields.dayOfbirthday,
    formFields.doNotHaveAnIDNumber,
    formFields.iban,
    formFields.man,
    formFields.monthOfbirthday,
    formFields.name,
    formFields.nationality,
    formFields.surname,
    formFields.woman,
    formFields.yearOfBirthday,
  ]);

  return (
    <div className="form-page1-container ">
      <Text as="h3">{t("form.page1.title")}</Text>
      <Form
        style={{ marginTop: 32 }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <TextInput
          value={formFields.name}
          onChange={(val) => updateFormFields({ name: val })}
          label={t("form.page1.firstName")}
        />
        <TextInput
          value={formFields.surname}
          onChange={(val) => updateFormFields({ surname: val })}
          label={t("form.page1.lastName")}
        />
        {formFields.doNotHaveAnIDNumber && (
          <TextDatePicker
            label={t("form.page1.dateOfBirthday")}
            dayValue={formFields.dayOfbirthday}
            monthValue={formFields.monthOfbirthday}
            yearValue={formFields.yearOfBirthday}
            onDayChange={(e) => updateFormFields({ dayOfbirthday: e })}
            onMonthChange={(e) => updateFormFields({ monthOfbirthday: e })}
            onYearChange={(e) => updateFormFields({ yearOfBirthday: e })}
          />
        )}
        {!formFields.doNotHaveAnIDNumber && (
          <TextInput
            value={formFields.personalIDNumber}
            onChange={(val) => updateFormFields({ personalIDNumber: val })}
            label={t("form.page1.personalIDNumber")}
          />
        )}
        {formFields.doNotHaveAnIDNumber && (
          <div className="d-flex">
            <CustomInput
              style={{
                margin: 0,
                marginLeft: 220,
              }}
              label={t("form.page1.woman")}
              checked={formFields.woman}
              onChange={(e) =>
                updateFormFields({
                  woman: !formFields.woman,
                })
              }
              type="checkbox"
              className="page1-gender-checkboxes"
            />
            <CustomInput
              style={{
                margin: 0,
                marginLeft: 16,
              }}
              label={t("form.page1.man")}
              checked={formFields.man}
              onChange={(e) =>
                updateFormFields({
                  man: !formFields.man,
                })
              }
              type="checkbox"
            />
          </div>
        )}
        <CustomInput
          className="do-not-have-id-checkbox"
          style={{
            margin: 0,
            marginLeft: 220,
          }}
          label={t("form.page1.doNotOwnEstonianPersonalIdNumber")}
          checked={formFields.doNotHaveAnIDNumber}
          onChange={(e) =>
            updateFormFields({
              doNotHaveAnIDNumber: !formFields.doNotHaveAnIDNumber,
            })
          }
          type="checkbox"
        />
        <TextInput
          containerStyle={{ marginTop: 16 }}
          value={formFields.nationality}
          onChange={(val) => updateFormFields({ nationality: val })}
          label={t("form.page1.nationality")}
        />
        <TextInput
          containerStyle={{ marginTop: 16 }}
          value={formFields.countryOfTaxResidence}
          onChange={(val) => updateFormFields({ countryOfTaxResidence: val })}
          label={t("form.page1.Countryoftaxresidence")}
        />
        <TextInput
          containerStyle={{ marginTop: 16 }}
          value={formFields.iban}
          onChange={(val) => updateFormFields({ iban: val })}
          label={t("form.page1.iban")}
        />
        <TTNewButton
          style={{ marginTop: 24 }}
          onClick={onContinue}
          disabled={!canContinue}
        >
          {t("continue")}
        </TTNewButton>
      </Form>
    </div>
  );
};

export default Page1;
