import React, { useState } from "react";
import HttpClient from "../api/httpclient";
import { logout, setFormPage } from "../redux/actions/app.actions";
import { useDispatch } from "react-redux";
import { toast } from "taltech-styleguide";
import { useTranslation } from "react-i18next";
/**
 * A custom React hook for saving user data and handling related states.
 * @returns {Object} An object containing functions and state variables.
 */
const useSaveUser = () => {
  const { t } = useTranslation();

  // State variables to track saving/loading and success status
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Redux dispatch function
  const dispatch = useDispatch();

  /**
   * Saves or confirms user data.
   * @param {Object} appState - The current application state from Redux.
   * @param {string} page - The current page ("confirm" or "result").
   */
  const saveUser = async (appState, page) => {
    const isConfirm = page === "confirm";
    let timer;

    try {
      setIsSavingLoading(true);
      timer = setTimeout(() => {
        toast.info(t("operation-inprogress"));
      }, 3000);
      // Prepare data transfer object (DTO) from form fields
      const dto = {
        first_name: appState.formFields.name ?? "",
        last_name: appState.formFields.surname ?? "",
        id_code: appState.formFields.personalIDNumber
          ? Number(appState.formFields.personalIDNumber)
          : null,
        orcid: appState.formFields.ordIDNumber ?? "",
        birthday:
          !appState.formFields.doNotHaveAnIDNumber ||
          !appState.formFields.yearOfBirthday ||
          !appState.formFields.monthOfbirthday ||
          !appState.formFields.dayOfbirthday
            ? ""
            : `${appState.formFields.yearOfBirthday}-${appState.formFields.monthOfbirthday}-${appState.formFields.dayOfbirthday}`,
        gender: appState.formFields.man
          ? "male"
          : appState.formFields.woman
          ? "woman"
          : "",
        nationality: appState.formFields.nationality ?? "",
        tax_residency: appState.formFields.countryOfTaxResidence ?? "",
        bank_account_number: appState.formFields.iban ?? "",
        phone_country_code: appState.formFields.phoneCode
          ? appState.formFields.phoneCode.slice(1)
          : "",
        phone_number: appState.formFields.phoneNumber ?? "",
        email: appState.formFields.email ?? "",
        home_address: {
          address: appState.formFields.residentalAddress ?? "",
        },
        education: appState.formFields.page3EducationForm.map((e) => {
          return {
            level: e.educationLevel,
            school: e.graduatedInstutation,
            document_nr: e.numberOfGraduation,
            document_date:
              e.graduateYear && e.graduateMonth && e.graduateDay
                ? `${e.graduateYear}-${e.graduateMonth}-${e.graduateDay}`
                : "",
          };
        }),
        children: appState.formFields.noChildren
          ? []
          : appState.formFields.page5ChildrenForm.map((e) => {
              return {
                firstname: e.firstName,
                lastname: e.surName,
                birthday:
                  e.yearOfBirthday && e.monthOfbirthday && e.dayOfbirthday
                    ? `${e.yearOfBirthday}-${e.monthOfbirthday}-${e.dayOfbirthday}`
                    : "",
              };
            }),
      };
      if (isConfirm) {
        // Make a POST request to confirm user data
        await HttpClient.Post("/user/confirm", dto);
        dispatch(setFormPage("result")); // Change the form page in Redux
        toast.success(t("form_submit_success_message"));
      } else {
        // Make a PUT request to save user data
        await HttpClient.Put("/user", dto);
        setIsSaved(true);
        toast.success(t("form_saved_success_message"));

        setTimeout(() => {
          setIsSaved(false);
          dispatch(logout());
        }, 1500);
      }
    } catch {
    } finally {
      clearTimeout(timer);

      setIsSavingLoading(false);
    }
  };

  // Return functions and state variables to be used in components
  return { saveUser, isSavingLoading, isSaved };
};

export default useSaveUser;
