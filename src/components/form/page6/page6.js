import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TTNewButton, Text } from "taltech-styleguide";
import CustomFileUploader from "../../customFileUploader/customFileUploader";
import { actionCreator } from "../../../redux/actions/common.actions";
import {
  SET_FORM_PAGE,
  UPDATE_FORM_FIELDS,
} from "../../../redux/actions/types";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import "./style.css";
const Page6 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormFields = (payload) => {
    dispatch(actionCreator(UPDATE_FORM_FIELDS, payload));
  };

  const onFileUploadChange = (files, field) => {
    const copyFiles = [...files];
    // eslint-disable-next-line array-callback-return
    copyFiles.map((e) => {
      e.id = uuid();
    });
    updateFormFields({
      [field]: [...formFields[field], ...files],
      ...copyFiles,
    });
  };

  const onRemove = (data, field) => {
    const copyItems = formFields[field].filter((e) => e.id !== data.id);
    updateFormFields({
      [field]: copyItems,
    });
  };
  const onContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(actionCreator(SET_FORM_PAGE, "result"));
    }, 3000);
  };
  const onBack = () => {
    dispatch(actionCreator(SET_FORM_PAGE, 5));
  };

  const canContinue = useMemo(() => {
    if (
      formFields.copyOfIdentity.length === 0 ||
      formFields.photo.length === 0 ||
      formFields.educationDocument.length === 0
    ) {
      return false;
    }
    return true;
  }, [
    formFields.copyOfIdentity.length,
    formFields.educationDocument.length,
    formFields.photo.length,
  ]);

  return (
    <div>
      <Text as="h3">{t("form.page6.title")}</Text>
      <Text color="primary" as="p">
        {t("form.page6.subtitle")}
      </Text>
      <CustomFileUploader
        type="idCard"
        files={formFields.copyOfIdentity.map((e) => {
          return { fileObject: e };
        })}
        onRemove={(data) => onRemove(data, "copyOfIdentity")}
        onChange={(e) => onFileUploadChange(e, "copyOfIdentity")}
        label={t("form.page6.copyIdentity")}
        sublabel={t("form.page6.forPersonalIdentification")}
      />
      <CustomFileUploader
        type="photo"
        files={formFields.photo.map((e) => {
          return { fileObject: e };
        })}
        onChange={(e) => onFileUploadChange(e, "photo")}
        label={t("foto")}
        sublabel={t("form.page6.forAdmitCard")}
        onRemove={(data) => onRemove(data, "photo")}
      />
      <CustomFileUploader
        files={formFields.educationDocument.map((e) => {
          return { fileObject: e };
        })}
        onChange={(e) => onFileUploadChange(e, "educationDocument")}
        label={t("form.page6.copyOfDocuments")}
        sublabel={t("form.page6.exceptDocument")}
        onRemove={(data) => onRemove(data, "educationDocument")}
      />
      <div className="page-6-buttons-container">
        <TTNewButton variant="outline" onClick={onBack}>
          {t("back")}
        </TTNewButton>
        <TTNewButton
          className="page6-continue-button"
          isLoading={isLoading}
          onClick={onContinue}
          disabled={!canContinue}
        >
          {t("sendDetails")}
        </TTNewButton>
      </div>
    </div>
  );
};

export default Page6;
