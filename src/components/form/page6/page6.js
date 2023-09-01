import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TTNewButton, Text } from "taltech-styleguide";
import CustomFileUploader from "../../customFileUploader/customFileUploader";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import ModalComponent from "../../modal";
import { setFormPage, updateForm } from "../../../redux/actions/app.actions";
import HttpClient from "../../../api/httpclient";
import useSaveUser from "../../../hooks/useSaveUser";
const Page6 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { formFields } = useSelector((state) => state.app);
  const appState = useSelector((state) => state.app);

  const [loadingStates, setLoadingStates] = useState({
    photo: false,
    copyOfIdentity: false,
    educationDocument: false,
  });
  const { saveUser, isSavingLoading } = useSaveUser();

  const updateFormFields = (payload) => {
    dispatch(updateForm(payload));
  };

  const onFileUploadChange = async (files, field) => {
    let newFiles = [];
    setLoadingStates((prevState) => ({
      ...prevState,
      [field]: true,
    }));
    if (field === "") {
    }
    try {
      if (files.length > 0) {
        await Promise.all(
          files.map(async (document) => {
            let data = new FormData();
            data.append("file", document);
            data.append("context", field);
            const res = await HttpClient.Post("/file", data);
            newFiles.push({ name: document.name, path: res.path });
          })
        );
      }
      if (field === "copyOfIdentity" || field === "photo") {
        //only one item can be selected for identity or photo
        updateFormFields({
          [field]: [...newFiles],
        });
      } else {
        updateFormFields({
          [field]: [...formFields[field], ...newFiles],
        });
      }
    } catch (error) {
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    }
  };

  const onRemove = async (data, field) => {
    try {
      setLoadingStates((prevState) => ({
        ...prevState,
        [field]: true,
      }));
      const res = await HttpClient.Delete("/file", { path: data.path });
      const copyItems = formFields[field].filter((e) => e.path !== data.path);
      updateFormFields({
        [field]: copyItems,
      });
    } catch (error) {
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    }
  };

  const onContinue = async () => {
    await saveUser(appState, "confirm");
  };
  const onBack = () => {
    dispatch(setFormPage(5));
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      <ModalComponent
        title={t("page6.submit.modal-text")}
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={onContinue}
        confirmText={t("saada")}
        isLoading={isSavingLoading}
      />
      <Text as="h3">{t("form.page6.title")}</Text>
      <CustomFileUploader
        isLoading={loadingStates.copyOfIdentity}
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
        isLoading={loadingStates.photo}
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
        isLoading={loadingStates.educationDocument}
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
          isLoading={isSavingLoading}
          onClick={() => setIsModalVisible(true)}
          disabled={!canContinue}
        >
          {t("sendDetails")}
        </TTNewButton>
      </div>
    </div>
  );
};

export default Page6;
