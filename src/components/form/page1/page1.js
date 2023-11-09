import React, { useMemo, useRef } from "react";
import { CustomInput, Form, TTNewButton, Text } from "taltech-styleguide";
import TextInput from "../../textInput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./page1.css";
import TextDatePicker from "../../textDatePicker/textDatePicker";
import { setFormPage, updateForm } from "../../../redux/actions/app.actions";
const Page1 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const fileInputRef = useRef(null);

  const updateFormFields = (payload) => {
    dispatch(updateForm(payload));
  };

  const onContinue = () => {
    dispatch(setFormPage(2));
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
        (formFields.woman || formFields.man) &&
        formFields.profilePhoto)
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
    formFields.profilePhoto,
  ]);

  const onProfilePhotoUpload = (e) => {
    const selectedFile = e.target.files[0];
    updateFormFields({ profilePhoto: selectedFile });
  };

  const onPhotoRemove = () => {
    fileInputRef.current.value = null;
    updateFormFields({ profilePhoto: null });
  };

  const profilePhotoSRC =
    formFields.profilePhoto instanceof File
      ? URL.createObjectURL(formFields.profilePhoto)
      : formFields.profilePhoto;

  return (
    <div className="form-page1-container">
      <Text as="h3">{t("form.page1.title")}</Text>
      <Form
        className="page-form-container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div
          className={`photo-upload-container ${
            formFields.profilePhoto ? "mobile-photo-upload-container" : ""
          }`}
        >
          <Text className="photo-text" color="primary">
            {t("photo")}:{" "}
            <Text as="span" className="text-input-required-star" color="danger">
              *
            </Text>
          </Text>
          {formFields.profilePhoto ? (
            <div>
              <img
                className="page1-profile-photo"
                src={profilePhotoSRC}
                alt="Profile"
              />
              <br />
              <TTNewButton
                className="page1-remove"
                onClick={onPhotoRemove}
                variant="link"
              >
                {t("remove")}
              </TTNewButton>
            </div>
          ) : (
            <label
              className="upload-photo-label"
              for="upload-photo"
              class="btn"
            >
              <Text as="span" className="upload-photo-placeholder-text">
                {t("upload-file")}
              </Text>
              <br />
              <Text className="upload-photo-format-text" color="gray-600">
                (JPG)
              </Text>
            </label>
          )}
          <input
            ref={fileInputRef}
            accept="image/jpeg"
            onChange={onProfilePhotoUpload}
            id="upload-photo"
            className="photo-upload-input"
            type="file"
          />
        </div>
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
              label={t("form.page1.woman")}
              checked={formFields.woman}
              onChange={(e) =>
                updateFormFields({
                  woman: !formFields.woman,
                  man: false,
                })
              }
              type="checkbox"
              className="page1-gender-checkboxes"
            />
            <CustomInput
              className="gender-man-checkbox"
              label={t("form.page1.man")}
              checked={formFields.man}
              onChange={(e) =>
                updateFormFields({
                  man: !formFields.man,
                  woman: false,
                })
              }
              type="checkbox"
            />
          </div>
        )}
        <CustomInput
          className="do-not-have-id-checkbox"
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
          containerClassName={"page1-nationality"}
          value={formFields.nationality}
          onChange={(val) => updateFormFields({ nationality: val })}
          label={t("form.page1.nationality")}
        />
        <TextInput
          value={formFields.countryOfTaxResidence}
          onChange={(val) => updateFormFields({ countryOfTaxResidence: val })}
          label={t("form.page1.Countryoftaxresidence")}
        />
        <TextInput
          value={formFields.iban}
          onChange={(val) => updateFormFields({ iban: val })}
          label={t("form.page1.iban")}
        />
        <TTNewButton
          className="page1-continue"
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
