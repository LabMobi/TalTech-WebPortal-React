import React from "react";
import { ConfigProvider } from "taltech-styleguide";
import { useSelector } from "react-redux";

const ConfigProviderWrapper = ({ children }) => {
  // Retrieve the currentLanguage state from the Redux store
  const { currentLanguage } = useSelector((state) => state.app);

  // Determine the locale based on the currentLanguage
  // If the currentLanguage is "est", set the locale to "et", otherwise set it to "en"
  const locale = currentLanguage === "est" ? "et" : "en";

  // Wrap the children components with the ConfigProvider and provide the determined locale
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};

export default ConfigProviderWrapper;
