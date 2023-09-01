import React, { useMemo, useState } from "react";
import { Form, TTNewButton, Text } from "taltech-styleguide";
import TextInput from "../../textInput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { defaultPage3EducationForm } from "../../../redux/reducers/app.reducer";
import uuid from "react-uuid";
import TextDatePicker from "../../textDatePicker/textDatePicker";
import ModalComponent from "../../modal";
import "./page3.css";
import { setFormPage, updateForm } from "../../../redux/actions/app.actions";
import { checkEveryFieldFilled } from "../../../helpers/helpers";
import { EDUCATION_LEVELS } from "../../../constants/enums";
const Page3 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(updateForm(payload));
  };
  const onContinue = () => {
    dispatch(setFormPage(4));
  };
  const onBack = () => {
    dispatch(setFormPage(2));
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const canContinue = useMemo(() => {
    if (
      checkEveryFieldFilled(formFields.page3EducationForm, "educationLevel") &&
      checkEveryFieldFilled(
        formFields.page3EducationForm,
        "graduatedInstutation"
      ) &&
      checkEveryFieldFilled(formFields.page3EducationForm, "graduateDay") &&
      checkEveryFieldFilled(formFields.page3EducationForm, "graduateMonth") &&
      checkEveryFieldFilled(formFields.page3EducationForm, "graduateYear") &&
      checkEveryFieldFilled(formFields.page3EducationForm, "numberOfGraduation")
    ) {
      return true;
    }
    return false;
  }, [formFields.page3EducationForm]);
  const educationLevels = [
    {
      name: t("education.Põhiharidus"),
      key: EDUCATION_LEVELS.basic_education,
    },
    {
      name: t("education.gümnaasiumiHaridus"),
      key: EDUCATION_LEVELS.secondary_education,
    },
    {
      name: t("education.kutseharidus"),
      key: EDUCATION_LEVELS.vocational_education,
    },
    {
      name: t("education.Bakalaureusekraad"),
      key: EDUCATION_LEVELS.bachelor_degree,
    },
    {
      name: t("education.Magistrikraad"),
      key: EDUCATION_LEVELS.master_degree,
    },
    {
      name: t("education.Doktorikraad"),
      key: EDUCATION_LEVELS.doctorate_degree,
    },
  ];

  const updateEducationForm = (field, val, i) => {
    const updatedEducationForm = formFields.page3EducationForm.map(
      (e, index) => {
        if (i !== index) {
          return e;
        } else {
          return {
            ...e,
            [field]:
              field === "educationLevel"
                ? educationLevels.find((e) => e.name === val)?.key ?? ""
                : val,
          };
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
  const [selectedRemoveIndex, setSelectedRemoveIndex] = useState(null);
  const onRemove = (index) => {
    setSelectedRemoveIndex(index);
    setIsModalVisible(true);
  };
  const onRemoveConfirm = () => {
    const updatedEducationForm = formFields.page3EducationForm.filter(
      (e, i) => selectedRemoveIndex !== i
    );
    updateFormFields({ page3EducationForm: updatedEducationForm });
    setIsModalVisible(false);
    setSelectedRemoveIndex(null);
  };

  const getEducationLevelValue = (i) => {
    return formFields.page3EducationForm[i].educationLevel
      ? educationLevels.find(
          (e) => e.key === formFields.page3EducationForm[i].educationLevel
        )?.name
      : "";
  };

  return (
    <div>
      <ModalComponent
        title={t("are-you-sure-remove-this-part")}
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={onRemoveConfirm}
        confirmText={t("remove")}
      />
      <Text as="h3">{t("form.page3.title")}</Text>
      <Form
        className="page-form-container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {formFields.page3EducationForm.map((e, i) => {
          return (
            <div className="education-form-card" key={e.id}>
              <TextInput
                labelClassName={"page3-input-label"}
                inputSelectionClassName="education-form-input-field"
                value={getEducationLevelValue(i)}
                onChange={(val) =>
                  updateEducationForm("educationLevel", val, i)
                }
                label={t("form.page3.highestLevelAchieved")}
                isSelection
                selectionData={educationLevels}
                fieldName={"name"}
              />
              <TextInput
                inputSelectionClassName="education-form-input-field"
                labelClassName={"page3-input-label"}
                containerClassName={"page3-input-container"}
                value={formFields.page3EducationForm[i].graduatedInstutation}
                onChange={(val) =>
                  updateEducationForm("graduatedInstutation", val, i)
                }
                label={t("form.page3.instutation")}
              />
              <TextInput
                labelClassName={"page3-input-label"}
                containerClassName={"page3-input-container"}
                inputSelectionClassName="education-form-input-field"
                value={formFields.page3EducationForm[i].numberOfGraduation}
                onChange={(val) =>
                  updateEducationForm("numberOfGraduation", val, i)
                }
                label={t("form.page3.numberOfGraduation")}
              />
              <TextDatePicker
                labelClassName={"page3-input-label page3-day-field"}
                label={t("form.page3.dateOfGraduate")}
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
                  className="page3-remove-button"
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
            className="page3-add-more"
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
          className="page3-continue"
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
