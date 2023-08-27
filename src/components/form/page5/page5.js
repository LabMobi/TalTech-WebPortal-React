import React, { useMemo, useState } from "react";
import { CustomInput, Form, TTNewButton, Text } from "taltech-styleguide";
import TextInput from "../../textInput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../../../redux/actions/common.actions";
import {
  SET_FORM_PAGE,
  UPDATE_FORM_FIELDS,
} from "../../../redux/actions/types";
import { defaultPage5ChildrenForm } from "../../../redux/reducers/app.reducer";
import uuid from "react-uuid";
import TextDatePicker from "../../textDatePicker/textDatePicker";
import ModalComponent from "../../modal";
import "./page5.css";
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

  const addNewChildrenForm = () => {
    const updatedChildrenForm = [
      ...formFields.page5ChildrenForm,
      { ...defaultPage5ChildrenForm[0], id: uuid() },
    ];
    updateFormFields({ page5ChildrenForm: updatedChildrenForm });
  };
  const [selectedRemoveIndex, setSelectedRemoveIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onRemove = (index) => {
    setSelectedRemoveIndex(index);
    setIsModalVisible(true);
  };

  const onRemoveConfirm = () => {
    const updatedChildrenForm = formFields.page5ChildrenForm.filter(
      (e, i) => selectedRemoveIndex !== i
    );
    updateFormFields({ page5ChildrenForm: updatedChildrenForm });

    setIsModalVisible(false);
    setSelectedRemoveIndex(null);
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
      <Text as="h3">{t("form.page5.title")}</Text>
      <Text color="primary" as="p">
        {t("form.page5.subtitle")}
      </Text>
      <Form
        className="page-form-container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {formFields.page5ChildrenForm.map((e, i) => {
          return (
            <div key={e.id} className="children-form-card">
              <TextInput
                labelClassName={"page5-input-label"}
                inputSelectionClassName="children-form-input-field"
                containerClassName={"page5-input-container"}
                value={formFields.page5ChildrenForm[i].firstName}
                onChange={(val) => updateChildrenForm("firstName", val, i)}
                label={t("form.page5.Eesnimi")}
              />
              <TextInput
                labelClassName={"page5-input-label"}
                inputSelectionClassName="children-form-input-field"
                containerClassName={"page5-input-container"}
                value={formFields.page5ChildrenForm[i].surName}
                onChange={(val) => updateChildrenForm("surName", val, i)}
                label={t("form.page5.Perenimi")}
              />
              <TextDatePicker
                labelClassName={"page5-input-label page5-day-field"}
                label={t("form.page5.Sünnikuupäev")}
                dayValue={formFields.page5ChildrenForm[i].dayOfbirthday}
                monthValue={formFields.page5ChildrenForm[i].monthOfbirthday}
                yearValue={formFields.page5ChildrenForm[i].yearOfBirthday}
                onDayChange={(val) =>
                  updateChildrenForm("dayOfbirthday", val, i)
                }
                onMonthChange={(val) =>
                  updateChildrenForm("monthOfbirthday", val, i)
                }
                onYearChange={(val) =>
                  updateChildrenForm("yearOfBirthday", val, i)
                }
              />

              {formFields.page5ChildrenForm.length > 1 && (
                <TTNewButton
                  className="page5-remove"
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
            className="page5-addmore"
            onClick={addNewChildrenForm}
            variant="link"
          >
            {t("addMore")}
          </TTNewButton>
        </div>
        <CustomInput
          className="page5-nochildren-checkbox"
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
          className="page5-continue"
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
