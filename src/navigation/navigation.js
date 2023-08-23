import React, { useCallback, useEffect } from "react";
import Onboarding from "../components/onboarding";
import Page1 from "../components/form/page1/page1";
import { useDispatch, useSelector } from "react-redux";
import Page2 from "../components/form/page2/page2";
import Page3 from "../components/form/page3/page3";
import Page4 from "../components/form/page4/page4";
import Page5 from "../components/form/page5/page5";
import Page6 from "../components/form/page6/page6";
import Result from "../components/result/result";
import { actionCreator } from "../redux/actions/common.actions";
import { SET_ALL_LOCAL_DATA } from "../redux/actions/types";

const Navigation = () => {
  const { isLoggedIn, formPage } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem("appState");
    if (storedData) {
      const parsedObject = JSON.parse(storedData);
      dispatch(actionCreator(SET_ALL_LOCAL_DATA, parsedObject));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderForm = useCallback(() => {
    switch (formPage) {
      case 1:
        return <Page1 />;
      case 2:
        return <Page2 />;
      case 3:
        return <Page3 />;
      case 4:
        return <Page4 />;
      case 5:
        return <Page5 />;
      case 6:
        return <Page6 />;
      case "result":
        return <Result />;

      default:
        break;
    }
  }, [formPage]);

  return isLoggedIn ? renderForm() : <Onboarding />;
};

export default Navigation;
