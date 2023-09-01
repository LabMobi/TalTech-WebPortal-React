import React, { useState } from "react";
import HttpClient from "../api/httpclient";
import { logout, setFormPage } from "../redux/actions/app.actions";
import { useDispatch } from "react-redux";

const useSaveUser = () => {
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  const saveUser = async (appState, page) => {
    const isConfirm = page === "confirm";
    try {
      setIsSavingLoading(true);
      const dto = {
        first_name: appState.formFields.name,
        last_name: appState.formFields.surname,
        id_code: Number(appState.formFields.personalIDNumber),
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
        nationality: appState.formFields.nationality,
        tax_residency: appState.formFields.countryOfTaxResidence,
        bank_account_number: appState.formFields.iban,
        phone_country_code: appState.formFields.phoneCode
          ? appState.formFields.phoneCode.slice(1)
          : "",
        phone_number: appState.formFields.phoneNumber,
        email: appState.formFields.email,
        home_address: {
          address: appState.formFields.residentalAddress,
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
        await HttpClient.Post("/user/confirm", dto);
        dispatch(setFormPage("result"));
      } else {
        await HttpClient.Put("/user", dto);
      }

      setIsSaved(true);

      if (!isConfirm) {
        setTimeout(() => {
          setIsSaved(false);
          dispatch(logout());
        }, 2000);
      }
    } catch {
    } finally {
      setIsSavingLoading(false);
    }
  };

  return { saveUser, isSavingLoading, isSaved };
};

export default useSaveUser;
