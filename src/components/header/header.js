import React from "react";
import "./header.css";
import { ReactComponent as TalTechLogo } from "./../../assets/svg/TalTechLogo.svg";
import LanguageSelection from "../languageSelection";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <TalTechLogo />
        <LanguageSelection />
      </div>
    </header>
  );
};

export default Header;
