import moment from "moment";
import HttpClient from "../../api/httpclient";
import { actionCreator } from "./common.actions";
import {
  LOGOUT,
  SET_ALL_LOCAL_DATA,
  SET_FORM_PAGE,
  SET_LANGUAGE,
  SET_LOADING,
  SET_LOGIN,
  SET_SELECTED_LOGIN_OPTION,
  SET_USER_FILES_LOADING,
  SET_USER_INFO_LOADING,
  UPDATE_FORM_FIELDS,
} from "./types";
import {
  defaultPage3EducationForm,
  defaultPage5ChildrenForm,
} from "../reducers/app.reducer";
import uuid from "react-uuid";
import { toast } from "taltech-styleguide";
import { store } from "../store/store";

export const verifyOTP = (data, t, onError) => {
  const { email, otp } = data;
  return async (dispatch) => {
    let timer;

    try {
      timer = setTimeout(() => {
        toast.info(t("operation-inprogress"));
      }, 3000);
      dispatch(actionCreator(SET_LOADING, true));

      const response = await HttpClient.Post("/verify-otp", {
        email,
        otp,
      });
      dispatch(
        actionCreator(SET_LOGIN, { isLoggedIn: true, token: response.token })
      );
    } catch (error) {
      onError && onError(error?.response?.data?.error);
      console.error("An error occurred while verifyOTP:", error);
    } finally {
      clearTimeout(timer);

      dispatch(actionCreator(SET_LOADING, false));
    }
  };
};

export const getUserInfo = (t) => {
  return async (dispatch) => {
    let timer;

    try {
      timer = setTimeout(() => {
        toast.info(t("operation-inprogress"));
      }, 3000);
      dispatch(actionCreator(SET_USER_INFO_LOADING, true));

      const response = await HttpClient.Get("/user");
      if (response.user) {
        let userBirthdayYear;
        let userBirthdayMonth;
        let userBirthdayDay;
        if (response.user.birthday) {
          const date = moment(response.user.birthday);

          userBirthdayYear = date.year();
          userBirthdayMonth = date.month() + 1;
          userBirthdayDay = date.date();
        }

        const userData = {
          name: response.user.first_name,
          surname: response.user.last_name,
          personalIDNumber: response.user.id_code ?? "",
          doNotHaveAnIDNumber:
            response.user.gender && response.user.birthday ? true : false,
          dayOfbirthday: response.user.birthday ? userBirthdayDay : "",
          monthOfbirthday: response.user.birthday ? userBirthdayMonth : "",
          yearOfBirthday: response.user.birthday ? userBirthdayYear : "",
          woman: response.user.gender === "woman",
          man: response.user.gender === "male",
          nationality: response.user.nationality,
          countryOfTaxResidence: response.user.tax_residency,
          iban: response.user.bank_account_number,
          phoneCode: response.user.phone_country_code
            ? `+${response.user.phone_country_code}`
            : "+372",
          phoneNumber: response.user.phone_number,
          email: response.user.email,
          residentalAddress: response.user?.home_address?.address
            ? response.user?.home_address?.address
            : "",
          ordIDNumber: response.user.orcid,
          orcIdNotNeeded: false,
          page3EducationForm:
            response.user?.education?.length > 0
              ? response.user.education.map((e) => {
                  let documentYear;
                  let documentMonth;
                  let documentDay;
                  if (e.document_date) {
                    const date = moment(e.document_date);

                    documentYear = date.year();
                    documentMonth = date.month() + 1;
                    documentDay = date.date();
                  }
                  return {
                    educationLevel: e.level ?? "",
                    graduatedInstutation: e.school ?? "",
                    numberOfGraduation: e.document_nr ?? "",
                    graduateDay: documentDay ?? "",
                    graduateMonth: documentMonth ?? "",
                    graduateYear: documentYear ?? "",
                    id: uuid(), // Generating a unique ID for each form entry
                  };
                })
              : defaultPage3EducationForm,
          page5ChildrenForm:
            response.user?.children?.length > 0
              ? response.user.children.map((e) => {
                  let birthdayYear;
                  let birthdayMonth;
                  let birthdayDay;
                  if (e.birthday) {
                    const date = moment(e.birthday);

                    birthdayYear = date.year();
                    birthdayMonth = date.month() + 1;
                    birthdayDay = date.date();
                  }
                  return {
                    firstName: e.firstname ?? "",
                    surName: e.lastname ?? "",
                    dayOfbirthday: birthdayDay ?? "",
                    monthOfbirthday: birthdayMonth ?? "",
                    yearOfBirthday: birthdayYear ?? "",
                    id: uuid(),
                  };
                })
              : defaultPage5ChildrenForm,
          noChildren: false,
        };
        dispatch(actionCreator(UPDATE_FORM_FIELDS, userData));
      }
    } catch (error) {
      console.error("An error occurred while getUserInfo:", error);
    } finally {
      clearTimeout(timer);

      dispatch(actionCreator(SET_USER_INFO_LOADING, false));
    }
  };
};

export const getUserFiles = (t) => {
  return async (dispatch) => {
    let timer;

    try {
      timer = setTimeout(() => {
        toast.info(t("operation-inprogress"));
      }, 3000);
      dispatch(actionCreator(SET_USER_FILES_LOADING, true));

      const response = await HttpClient.Get("/user/files");
      if (response?.files?.length > 0) {
        // Filter items with the "copyOfIdentity" context
        const copyOfIdentityFiles = response.files.filter(
          (e) => e.context === "copyOfIdentity"
        );
        // Filter items with the "photo" context
        const photoFiles = response.files.filter((e) => e.context === "photo");
        // Filter items with the "educationDocument" context
        const educationDocumentFiles = response.files.filter(
          (e) => e.context === "educationDocument"
        );

        // Sort by date to find the most recently added item
        copyOfIdentityFiles.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });

        // Get the most recently added "copyOfIdentity" item
        let lastAddedCopyOfIdentity;
        if (copyOfIdentityFiles.length > 0) {
          lastAddedCopyOfIdentity = copyOfIdentityFiles[0];
        } else {
          // console.log("copyOfIdentity not found.");
        }

        // Sort by date to find the most recently added item
        photoFiles.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });

        // Get the most recently added "photo" item
        let lastAddedPhoto;
        if (photoFiles.length > 0) {
          lastAddedPhoto = photoFiles[0];
        } else {
          // console.log("Photo not found.");
        }

        // Get user profile photo
        const profilePhoto = response.files.find(
          (e) => e.context === "profilePhoto"
        );
        const profilePhotoPayload = {};
        if (profilePhoto) {
          profilePhotoPayload.path = profilePhoto.path;
          profilePhotoPayload.name = profilePhoto.name;
          const state = store.getState();
          const token = state?.app?.token;
          const ppResponse = await fetch(
            `https://taltech.appit.cloud/api/file?path=${profilePhoto.path}&context=profilePhoto`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const imageBlob = await ppResponse.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          profilePhotoPayload.img = imageObjectURL;
        }

        const data = {
          profilePhoto: profilePhotoPayload.img ? profilePhotoPayload : null,
          copyOfIdentity: lastAddedCopyOfIdentity
            ? [lastAddedCopyOfIdentity]
            : [],
          photo: lastAddedPhoto ? [lastAddedPhoto] : [],
          educationDocument:
            educationDocumentFiles.length > 0 ? educationDocumentFiles : [],
        };
        dispatch(actionCreator(UPDATE_FORM_FIELDS, data));
      }
    } catch (error) {
      console.error("An error occurred while verifyOTP:", error);
    } finally {
      clearTimeout(timer);

      dispatch(actionCreator(SET_USER_FILES_LOADING, false));
    }
  };
};

export const setLogin = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_LOGIN, data));
  };
};
export const setSelectedLoginOption = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_SELECTED_LOGIN_OPTION, data));
  };
};
export const setLanguage = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_LANGUAGE, data));
  };
};
export const setFormPage = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_FORM_PAGE, data));
  };
};

export const updateForm = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(UPDATE_FORM_FIELDS, data));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(actionCreator(LOGOUT));
  };
};

export const setLocalData = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_ALL_LOCAL_DATA, data));
  };
};

export const setLoading = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_LOADING, data));
  };
};

export const setUserInfoLoading = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_USER_INFO_LOADING, data));
  };
};

export const setUserFilesLoading = (data) => {
  return (dispatch) => {
    dispatch(actionCreator(SET_USER_FILES_LOADING, data));
  };
};
