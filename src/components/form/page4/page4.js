/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { CustomInput, Form, TTNewButton, Text } from "taltech-styleguide";
import TextInput from "../../textInput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLanguage } from "../../../localization/i18n.config";
import "./style.css";
import { setFormPage, updateForm } from "../../../redux/actions/app.actions";
const Page4 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(updateForm(payload));
  };

  const onContinue = () => {
    dispatch(setFormPage(5));
  };

  const onBack = () => {
    dispatch(setFormPage(3));
  };
  const canContinue = useMemo(() => {
    if (formFields.orcIdNotNeeded || formFields.ordIDNumber) {
      return true;
    }
    return false;
  }, [formFields.orcIdNotNeeded, formFields.ordIDNumber]);
  const currentLanguage = getCurrentLanguage();

  useEffect(() => {
    if (formFields.orcIdNotNeeded) {
      updateFormFields({ ordIDNumber: "" });
    }
  }, [formFields.orcIdNotNeeded]);

  useEffect(() => {
    if (formFields.ordIDNumber) {
      updateFormFields({ orcIdNotNeeded: false });
    }
  }, [formFields.ordIDNumber]);

  return (
    <div>
      <Text as="h3">{t("form.page4.title")}</Text>
      <Text color="primary" as="p">
        {t("form.page4.subtitle")}
      </Text>
      <Form
        className="page-form-container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <TextInput
          value={formFields.ordIDNumber}
          onChange={(val) => updateFormFields({ ordIDNumber: val })}
          label={t("form.page4.ORD-IDnumber")}
        />
        <div className="orc-description-text">
          {currentLanguage === "est" ? (
            <Text>
              Kui kood puudub, siis loo see veebilehel{" "}
              <TTNewButton variant="link" color="secondary">
                https://orcid.org/signin
              </TTNewButton>
              . Seo ORC-ID identifitseerimiskoodiga referaatandmebaasides
              avalikustatud publikatsioonid. Ülikool kasutab akadeemilise
              personali publitseerimise tulemuslikkuse hindamisel koodi
              otsinguna Scopus viiteandmebaasis. Avalikusta kood ka enda ETISe
              CVs.
            </Text>
          ) : (
            <Text>
              If the code is missing, create it at{" "}
              <TTNewButton variant="link" color="secondary">
                https://orcid.org/signin
              </TTNewButton>
              . Link the publications published in reference databases with the
              ORC-ID identification code. The university uses the code as a
              search in the Scopus reference database when evaluating the
              publication performance of academic staff. Also publish the code
              in your ETIS CV.
            </Text>
          )}
        </div>
        <CustomInput
          className="orc-checkbox"
          label={t("form.page4.ORD-required")}
          checked={formFields.orcIdNotNeeded}
          onChange={(e) =>
            updateFormFields({
              orcIdNotNeeded: !formFields.orcIdNotNeeded,
            })
          }
          type="checkbox"
        />
        <TTNewButton variant="outline" onClick={onBack}>
          {t("back")}
        </TTNewButton>
        <TTNewButton
          className="page4-continue"
          onClick={onContinue}
          disabled={!canContinue}
        >
          {t("continue")}
        </TTNewButton>
      </Form>
    </div>
  );
};

export default Page4;
