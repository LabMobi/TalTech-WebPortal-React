import React from "react";
import { ConfigProvider } from "taltech-styleguide";
import { useSelector } from "react-redux";

const ConfigProviderWrapper = ({ children }) => {
  const { currentLanguage } = useSelector((state) => state.app);

  const locale = currentLanguage === "est" ? "et" : "en";
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};

export default ConfigProviderWrapper;
