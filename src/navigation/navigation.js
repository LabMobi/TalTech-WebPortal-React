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
import { getUserFiles, getUserInfo } from "../redux/actions/app.actions";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { isLoggedIn, formPage, token } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Interactive effect that runs when logged in
  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getUserInfo(t));
      dispatch(getUserFiles(t));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, token]);

  // Function for dynamically rendering the form page
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

  // Render the form if logged in, otherwise render the onboarding screen
  return isLoggedIn ? renderForm() : <Onboarding />;
};

export default Navigation;
