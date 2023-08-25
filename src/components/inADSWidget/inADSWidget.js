/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import { Form, Text } from "taltech-styleguide";
import "./style.css";
import { getCurrentLanguage } from "../../localization/i18n.config";
import { useTranslation } from "react-i18next";
const InAdsWidget = ({ label, onAddressSelect, selectedAddress }) => {
  const { t } = useTranslation();
  var inAadress;
  const setSelectedAddres = () => {
    inAadress.setAddress(selectedAddress, false);
  };
  // useEffect(() => {
  //   debugger;
  //   if (selectedAddress && inAadress && inAadress.setAddress) {
  //     inAadress.setAddress(selectedAddress, false);
  //   }
  // }, [inAadress, selectedAddress]);
  const currentLanguage = getCurrentLanguage();
  useEffect(() => {
    if (window.InAadress) {
      // eslint-disable-next-line no-undef
      if (!inAadress) {
        inAadress = new InAadress({
          container: "InAadressDiv",
          mode: 3,
          ihist: "1993",
          appartment: 1,
          lang: currentLanguage === "est" ? "et" : "en",
        });
      }
      if (selectedAddress) {
        setSelectedAddres();
      }
      document.addEventListener("addressSelected", function (e) {
        var info = e.detail;
        const address = info.find((e) => {
          if (e.aadress) {
            return e;
          }
          return "";
        });
        if (address) {
          onAddressSelect(address.aadress);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const inputElement = document.querySelector(
      "#InAadressDiv > div.inads-input-div > input"
    );
    if (inputElement) {
      inputElement.placeholder = t("form.page2.searchForAnAddress");
    }
  }, []);

  const handleInputClear = () => {
    onAddressSelect("");
  };

  useEffect(() => {
    const inputElement = document.querySelector(".inads-input");
    const clearButton = document.querySelector(".inads-input-clear");
    if (clearButton) {
      clearButton.addEventListener("click", handleInputClear);
    }
    if (inputElement) {
      inputElement.addEventListener("input", () => {
        if (inputElement.value === "") {
          handleInputClear();
        }
      });

      return () => {
        inputElement.removeEventListener("input", () => {
          if (inputElement.value === "") {
            handleInputClear();
          }
        });
      };
    }
  }, []);

  const appartmentRef = useRef(null);

  useEffect(() => {
    const observerCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "childList" &&
          mutation.target.classList.contains("inads-appartment")
        ) {
          const target = mutation.target;

          const optionText =
            target.querySelector("option[selected]").textContent;

          if (optionText === "vali korter") {
            target.querySelector("option[selected]").textContent = "krt";
          }
          if (optionText === "choose appartment") {
            target.querySelector("option[selected]").textContent = "apt.";
          }
        }
      }
    };

    const observer = new MutationObserver(observerCallback);

    if (appartmentRef.current) {
      observer.observe(appartmentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (appartmentRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="d-flex  address-selection">
      <Form.Label className="in-ads-form-label text-input-label  d-flex">
        <Text color="primary"> {label}: </Text>{" "}
        <Text className="text-input-required-star" color="danger">
          {"*"}
        </Text>
      </Form.Label>
      <div
        ref={appartmentRef}
        id="InAadressDiv"
        className="inads-input-div inads-input-container"
      />
    </div>
  );
};

export default InAdsWidget;
