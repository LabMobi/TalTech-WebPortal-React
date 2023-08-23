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
import { defaultPage3EducationForm } from "../../../redux/reducers/app.reducer";
import uuid from "react-uuid";
import TextDatePicker from "../../textDatePicker/textDatePicker";

const Page3 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(actionCreator(UPDATE_FORM_FIELDS, payload));
  };
  const onContinue = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 4));
  };
  const onBack = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 2));
  };
  const canContinue = useMemo(() => {
    if (
      formFields.page3EducationForm[0].educationLevel &&
      formFields.page3EducationForm[0].graduatedInstutation &&
      formFields.page3EducationForm[0].graduateDay &&
      formFields.page3EducationForm[0].graduateMonth &&
      formFields.page3EducationForm[0].graduateYear
    ) {
      return true;
    }
    return false;
  }, [formFields.page3EducationForm]);
  console.log("formFields.page3EducationForm: ", formFields.page3EducationForm);
  const educationLevels = [
    {
      name: t("education.Põhiharidus"),
      key: "Põhiharidus",
    },
    {
      name: t("education.gümnaasiumiHaridus"),
      key: "Kesk- / gümnaasiumi haridus",
    },
    {
      name: t("education.kutseharidus"),
      key: "Keskeri- / kutseharidus",
    },
    {
      name: t("education.Bakalaureusekraad"),
      key: "Bakalaureuse kraad",
    },
    {
      name: t("education.Magistrikraad"),
      key: "Magistrikraad",
    },
    {
      name: t("education.Doktorikraad"),
      key: "Doktorikraad",
    },
  ];
  const updateEducationForm = (field, val, i) => {
    const updatedEducationForm = formFields.page3EducationForm.map(
      (e, index) => {
        if (i !== index) {
          return e;
        } else {
          return { ...e, [field]: val };
        }
      }
    );
    updateFormFields({ page3EducationForm: updatedEducationForm });
  };

  const addNewEducationForm = () => {
    const updatedEducationForm = [
      ...formFields.page3EducationForm,
      { ...defaultPage3EducationForm[0], id: uuid() },
    ];
    updateFormFields({ page3EducationForm: updatedEducationForm });
  };

  const onRemove = (index) => {
    const updatedEducationForm = formFields.page3EducationForm.filter(
      (e, i) => index !== i
    );
    updateFormFields({ page3EducationForm: updatedEducationForm });
  };

  return (
    <div>
      <Text as="h3">{t("form.page3.title")}</Text>
      <Form
        style={{ marginTop: 32 }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {formFields.page3EducationForm.map((e, i) => {
          return (
            <div
              key={e.id}
              style={{ borderBottom: "1px solid #DADAE4", paddingBottom: 16 }}
            >
              <TextInput
                labelStyle={{ marginRight: 32 }}
                inputContainerStyle={{ height: 44 }}
                value={formFields.page3EducationForm[i].educationLevel}
                onChange={(val) =>
                  updateEducationForm("educationLevel", val, i)
                }
                label={t("form.page3.highestLevelAchieved")}
                isSelection
                selectionData={educationLevels}
                fieldName={"name"}
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
                value={formFields.page3EducationForm[i].graduatedInstutation}
                onChange={(val) =>
                  updateEducationForm("graduatedInstutation", val, i)
                }
                label={t("form.page3.instutation")}
              />
              <TextDatePicker
                labelStyle={{ marginRight: 32 }}
                label={t("form.page3.graduateDate")}
                dayValue={formFields.page3EducationForm[i].graduateDay}
                monthValue={formFields.page3EducationForm[i].graduateMonth}
                yearValue={formFields.page3EducationForm[i].graduateYear}
                onDayChange={(val) =>
                  updateEducationForm("graduateDay", val, i)
                }
                onMonthChange={(val) =>
                  updateEducationForm("graduateMonth", val, i)
                }
                onYearChange={(val) =>
                  updateEducationForm("graduateYear", val, i)
                }
              />
              {formFields.page3EducationForm.length > 1 && (
                <TTNewButton
                  style={{ textDecoration: "underline", marginTop: 16 }}
                  onClick={() => onRemove(i)}
                  variant="link"
                >
                  {t("remove")}
                </TTNewButton>
              )}
            </div>
          );
        })}
        <div>
          <TTNewButton
            style={{ textDecoration: "underline", marginBottom: 40 }}
            onClick={addNewEducationForm}
            variant="link"
          >
            {t("addMore")}
          </TTNewButton>
        </div>
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

export default Page3;
