import React, { useEffect, useState, useRef } from "react";
import { Form, Text } from "taltech-styleguide";
import "./style.css";
import { getCurrentLanguage } from "../../localization/i18n.config";
import { useTranslation } from "react-i18next";

/**
 * InAdsWidget is a component for address selection.
 *
 * @param {string} label - The label to be displayed in the form.
 * @param {function} onAddressSelect - The function to be called when an address is selected.
 * @param {string} selectedAddress - The value of the selected address.
 * @param {function} setIsApartmentSelectionDone - The function to be called when apartment selection is completed.
 */
const InAdsWidget = ({
  label,
  onAddressSelect,
  selectedAddress,
  setIsApartmentSelectionDone,
}) => {
  const { t } = useTranslation();
  var inAadress;
  const setSelectedAddres = () => {
    inAadress.setAddress(selectedAddress, false);
  };
  const [isApartmentSelectionVisible, setIsApartmentSelectionVisible] =
    useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const currentLanguage = getCurrentLanguage();
  const appartmentRef = useRef(null);

  /**
   * Use effect hook that manages the visibility of apartment selection.
   * Sets the status of apartment selection based on conditions.
   */
  useEffect(() => {
    if (!isApartmentSelectionVisible) {
      // If apartment selection is not visible, set it as done.
      setIsApartmentSelectionDone(true);
    } else if (isApartmentSelectionVisible && selectedApartment) {
      // If apartment selection is visible and an apartment is selected, set it as done.
      setIsApartmentSelectionDone(true);
    } else {
      // Otherwise, set apartment selection as not done.
      setIsApartmentSelectionDone(false);
    }
  }, [
    isApartmentSelectionVisible,
    selectedApartment,
    setIsApartmentSelectionDone,
  ]);

  /**
   * Use effect hook that sets up and configures the InAadress library for address selection.
   */
  useEffect(() => {
    if (window.InAadress) {
      // Check if the InAadress library is available.
      if (!inAadress) {
        // Create an instance of InAadress if it doesn't already exist.
        // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
        inAadress = new InAadress({
          container: "InAadressDiv",
          mode: 3,
          ihist: "1993",
          appartment: 1,
          lang: currentLanguage === "est" ? "et" : "en",
        });
      }

      // Set the selected address if available.
      if (selectedAddress) {
        setSelectedAddres();
      }

      // Add an event listener for when an address is selected.
      document.addEventListener("addressSelected", function (e) {
        var info = e.detail;
        const address = info.find((e) => {
          if (e.aadress) {
            return e;
          }
          return "";
        });
        if (address) {
          // Call the onAddressSelect function with the selected address
          onAddressSelect(address.aadress);
          setSelectedApartment(address.kort_nr);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Use effect hook that sets up a placeholder for an input element.
   */
  useEffect(() => {
    const inputElement = document.querySelector(
      "#InAadressDiv > div.inads-input-div > input"
    );

    // Set the placeholder for the input element if it exists.
    if (inputElement) {
      inputElement.placeholder = t("form.page2.searchForAnAddress");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputClear = () => {
    onAddressSelect("");
  };

  /**
   * Use effect hook that sets up event listeners for an input element and a clear button.
   * The event listeners handle input changes and clearing the input field.
   */
  useEffect(() => {
    const inputElement = document.querySelector(".inads-input");
    const clearButton = document.querySelector(".inads-input-clear");

    // Add an event listener to the clear button to handle input clearing.
    if (clearButton) {
      clearButton.addEventListener("click", handleInputClear);
    }

    // Add an event listener to the input element to handle input changes.
    if (inputElement) {
      inputElement.addEventListener("input", () => {
        // If the input becomes empty, clear its value.
        if (inputElement.value === "") {
          handleInputClear();
        }
      });

      // Remove the input element's event listener when the component unmounts.
      return () => {
        inputElement.removeEventListener("input", () => {
          if (inputElement.value === "") {
            handleInputClear();
          }
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Use effect hook that sets up a MutationObserver to watch for changes in a apartment element.
   */
  useEffect(() => {
    const observerCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          (mutation.type === "childList" || mutation.type === "attributes") &&
          mutation.target.classList.contains("inads-appartment")
        ) {
          const target = mutation.target;

          if (mutation.type === "childList") {
            const optionText =
              target.querySelector("option[selected]").textContent;

            if (optionText === "vali korter") {
              target.querySelector("option[selected]").textContent = "krt";
            }
            if (optionText === "choose appartment") {
              target.querySelector("option[selected]").textContent = "apt.";
            }
          } else {
            const hasHiddenClass = target.classList.contains("hidden");
            if (hasHiddenClass) {
              setIsApartmentSelectionVisible(false);
            } else {
              setIsApartmentSelectionVisible(true);
            }
          }
        }
      }
    };

    const observer = new MutationObserver(observerCallback);

    if (appartmentRef.current) {
      observer.observe(appartmentRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      // Clean up the observer when the component unmounts.
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
