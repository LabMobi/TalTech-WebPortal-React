/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Form, Text } from "taltech-styleguide";

const InAdsWidget = ({ label, onAddressSelect, selectedAddress }) => {
  var inAadress;
  useEffect(() => {
    if (selectedAddress && inAadress && inAadress.setAddress) {
      //set
      //   var inAadress = new InAadress({
      //     container: "InAadressDiv",
      //     mode: 3,
      //     ihist: "1993",
      //     appartment: 2,
      //     lang: "en",
      //   });
      const inadsContainers = document.querySelectorAll(".inads-input-div");

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
          appartment: 2,
          lang: "en",
        });
      }

      const inadsContainers = document.querySelectorAll(".inads-input-div");

      document.addEventListener("addressSelected", function (e) {
        //   console.log("E:!!: ", e);
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
        //   alert("valitud aadress: " + info.aadress);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ zIndex: 999 }} className="d-flex align-items-center">
      <Form.Label className=" text-input-label  " style={{ margin: 0 }}>
        <Text color="primary"> {label}: </Text>
      </Form.Label>
      <div
        id="InAadressDiv"
        className="inads-input-div"
        style={{ width: "400px", height: "450px", zIndex: 9999 }}
      />
    </div>
  );
};

export default InAdsWidget;
