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
import CustomDatePicker from "../../customDatePicker";
import { defaultPage5ChildrenForm } from "../../../redux/reducers/app.reducer";
import uuid from "react-uuid";

const Page5 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(actionCreator(UPDATE_FORM_FIELDS, payload));
  };
  const onContinue = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 6));
  };
  const onBack = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 4));
  };

  const canContinue = useMemo(() => {
    if (
      !formFields.noChildren &&
      (!formFields.page5ChildrenForm[0].firstName ||
        !formFields.page5ChildrenForm[0].surName)
    ) {
      return false;
    }
    return true;
  }, [formFields.noChildren, formFields.page5ChildrenForm]);
  const updateChildrenForm = (field, val, i) => {
    const updatedChildrenForm = formFields.page5ChildrenForm.map((e, index) => {
      if (i !== index) {
        return e;
      } else {
        return { ...e, [field]: val };
      }
    });
    updateFormFields({ page5ChildrenForm: updatedChildrenForm });
  };

  const addNewEducationForm = () => {
    const updatedChildrenForm = [
      ...formFields.page5ChildrenForm,
      { ...defaultPage5ChildrenForm[0], id: uuid() },
    ];
    updateFormFields({ page5ChildrenForm: updatedChildrenForm });
  };
  return (
    <div>
      <Text as="h3">{t("form.page5.title")}</Text>
      <Text color="primary" as="p">
        {t("form.page5.subtitle")}
      </Text>
      <Form
        style={{ marginTop: 32 }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {formFields.page5ChildrenForm.map((e, i) => {
          return (
            <div
              key={e.id}
              style={{ borderBottom: "1px solid #DADAE4", paddingBottom: 16 }}
            >
              <TextInput
                labelStyle={{
                  marginRight: 32,
                }}
                containerStyle={{
                  marginTop: 16,
                  marginBottom: 16,
                }}
                inputContainerStyle={{ height: 44 }}
                value={formFields.page5ChildrenForm[i].firstName}
                onChange={(val) => updateChildrenForm("firstName", val, i)}
                label={t("form.page5.Eesnimi")}
              />
              <TextInput
                labelStyle={{
                  marginRight: 32,
                }}
                containerStyle={{
                  marginTop: 16,
                  marginBottom: 16,
                }}
                inputContainerStyle={{ height: 44 }}
                value={formFields.page5ChildrenForm[i].surName}
                onChange={(val) => updateChildrenForm("surName", val, i)}
                label={t("form.page5.Perenimi")}
              />
              <CustomDatePicker
                labelStyle={{ marginRight: 32 }}
                label={t("form.page5.Sünnikuupäev")}
                value={new Date(formFields.page5ChildrenForm[i].date)}
                onChange={(val) => updateChildrenForm("date", val, i)}
              />
            </div>
          );
        })}
        <div>
          <TTNewButton onClick={addNewEducationForm} variant="link">
            {t("addMore")}
          </TTNewButton>
        </div>
        <CustomInput
          style={{
            margin: 0,
            marginBottom: 42,
          }}
          label={t("form.page5.noChildrenCheckbox")}
          checked={formFields.noChildren}
          onChange={(e) =>
            updateFormFields({
              noChildren: !formFields.noChildren,
            })
          }
          type="checkbox"
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

export default Page5;
