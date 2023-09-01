import { LOGIN_OPTIONS } from "../../constants/enums";
import {
  LOGOUT,
  SET_ALL_LOCAL_DATA,
  SET_FORM_PAGE,
  SET_LANGUAGE,
  SET_LOADING,
  SET_SELECTED_LOGIN_OPTION,
  SET_USER_FILES_LOADING,
  SET_USER_INFO_LOADING,
  UPDATE_FORM_FIELDS,
} from "../actions/types";
import { SET_LOGIN } from "../actions/types";
import uuid from "react-uuid";

// Default data for page 3 education form
export const defaultPage3EducationForm = [
  {
    educationLevel: "",
    graduatedInstutation: "",
    numberOfGraduation: "",
    graduateDay: "",
    graduateMonth: "",
    graduateYear: "",
    id: uuid(), // Generating a unique ID for each form entry
  },
];

// Default data for page 5 children form
export const defaultPage5ChildrenForm = [
  {
    firstName: "",
    surName: "",
    dayOfbirthday: "",
    monthOfbirthday: "",
    yearOfBirthday: "",
    id: uuid(), // Generating a unique ID for each form entry
  },
];

// Default form fields
const defaultFormFields = {
  name: "",
  surname: "",
  personalIDNumber: "",
  doNotHaveAnIDNumber: false,
  dayOfbirthday: "",
  monthOfbirthday: "",
  yearOfBirthday: "",
  woman: false,
  man: false,
  nationality: "",
  countryOfTaxResidence: "",
  iban: "",
  phoneCode: "+372",
  phoneNumber: "",
  email: "",
  residentalAddress: "",
  page3EducationForm: defaultPage3EducationForm,
  ordIDNumber: "",
  orcIdNotNeeded: false,
  page5ChildrenForm: defaultPage5ChildrenForm,
  noChildren: false,
  copyOfIdentity: [],
  photo: [],
  educationDocument: [],
};

// Initial state for the reducer
const initialState = {
  loading: false,
  error: {},
  isLoggedIn: false,
  selectedLoginOption: LOGIN_OPTIONS.EMAIL,
  formFields: defaultFormFields,
  currentLanguage: "est",
  formPage: 1,
  token: null,
  userInfoLoading: false,
  userFilesLoading: false,
};

// Reducer function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token,
      };
    case SET_SELECTED_LOGIN_OPTION:
      return {
        ...state,
        selectedLoginOption: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
      };
    case SET_FORM_PAGE:
      return {
        ...state,
        formPage: action.payload,
      };
    case UPDATE_FORM_FIELDS:
      return {
        ...state,
        formFields: { ...state.formFields, ...action.payload },
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        formPage: 1,
        selectedLoginOption: null,
        formFields: defaultFormFields,
        token: null,
      };
    case SET_ALL_LOCAL_DATA:
      return {
        ...action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_USER_INFO_LOADING:
      return {
        ...state,
        userInfoLoading: action.payload,
      };
    case SET_USER_FILES_LOADING:
      return {
        ...state,
        userFilesLoading: action.payload,
      };
    default:
      return state;
  }
}
