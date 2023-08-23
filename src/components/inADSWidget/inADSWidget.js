/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Form, Text } from "taltech-styleguide";
import "./style.css";
const InAdsWidget = ({ label, onAddressSelect, selectedAddress }) => {
  var inAadress;
  useEffect(() => {
    if (selectedAddress && inAadress && inAadress.setAddress) {
      inAadress.setAddress(selectedAddress, false);
    }
  }, [inAadress, selectedAddress]);

  useEffect(() => {
    if (window.InAadress) {
      // eslint-disable-next-line no-undef
      if (!inAadress) {
        inAadress = new InAadress({
          container: "InAadressDiv",
          mode: 3,
          ihist: "1993",
          appartment: 1,
          lang: "en",
        });
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
    const inputSearch = document.querySelector(".inads-input-search");
    if (inputSearch) {
      inputSearch.style.backgroundImage =
        'url("https://www.svgrepo.com/show/3948/search-magnifier-outline.svg")';
      inputSearch.style.backgroundSize = "14px 14px";
      inputSearch.style.backgroundPosition = "center";
    }

    const inputClear = document.querySelector(".inads-input-clear");
    if (inputClear) {
      inputClear.style.backgroundImage =
        'url("https://www.svgrepo.com/show/506648/clear.svg")';
      inputClear.style.backgroundSize = "24px 24px";
      inputClear.style.backgroundPosition = "center";
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

  return (
    <div style={{ zIndex: 999 }} className="d-flex  address-selection">
      <Form.Label className=" text-input-label  d-flex" style={{ margin: 0 }}>
        <Text color="primary"> {label}: </Text>{" "}
        <Text className="text-input-required-star" color="danger">
          {"*"}
        </Text>
      </Form.Label>
      <div
        id="InAadressDiv"
        className="inads-input-div inads-input-container"
        style={{ width: "300px", height: "450px", zIndex: 9999 }}
      />
    </div>
  );
};

export default InAdsWidget;
