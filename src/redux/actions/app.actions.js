import { actionCreator } from "./common.actions";
import {
  LOGOUT,
  SET_ALL_LOCAL_DATA,
  SET_FORM_PAGE,
  SET_LANGUAGE,
  SET_LOGIN,
  SET_SELECTED_LOGIN_OPTION,
  UPDATE_FORM_FIELDS,
} from "./types";

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
