import React, { useMemo } from "react";
import { CustomInput, Form, TTNewButton, Text } from "taltech-styleguide";
import TextInput from "../../textInput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../../../redux/actions/common.actions";
import {
  SET_FORM_PAGE,
  UPDATE_FORM_FIELDS,
} from "../../../redux/actions/types";
import { getCurrentLanguage } from "../../../localization/i18n.config";

const Page4 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(actionCreator(UPDATE_FORM_FIELDS, payload));
  };
  const onContinue = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 5));
  };
  const onBack = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 3));
  };
  const canContinue = useMemo(() => {
    if (formFields.orcIdNotNeeded || formFields.ordIDNumber) {
      return true;
    }
    return false;
  }, [formFields.orcIdNotNeeded, formFields.ordIDNumber]);
  const currentLanguage = getCurrentLanguage();
  return (
    <div>
      <Text as="h3">{t("form.page4.title")}</Text>
      <Text color="primary" as="p">
        {t("form.page4.subtitle")}
      </Text>
      <Form
        style={{ marginTop: 32 }}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <TextInput
          value={formFields.ordIDNumber}
          onChange={(val) => updateFormFields({ ordIDNumber: val })}
          label={t("form.page4.ORD-IDnumber")}
        />
        <div
          style={{
            marginLeft: 220,
          }}
        >
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
          style={{
            margin: 0,
            marginLeft: 220,
          }}
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
          style={{ marginLeft: 16 }}
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
