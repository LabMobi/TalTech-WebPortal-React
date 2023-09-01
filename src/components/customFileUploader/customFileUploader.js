import React from "react";
import { TTNewFileUpload, Text } from "taltech-styleguide";
import "./style.css";
import { getCurrentLanguage } from "../../localization/i18n.config";
import { useTranslation } from "react-i18next";
import { isMobile as isDeviceMobile } from "react-device-detect";

/**
 * A custom file uploader component.
 * @param {Object} props - Component props.
 * @param {function} props.onChange - Function to handle file selection.
 * @param {function} props.onRemove - Function to handle file removal.
 * @param {string} props.label - The label for the file uploader.
 * @param {string} props.sublabel - Sublabel text for additional information.
 * @param {Array} props.files - The selected files.
 * @param {string} props.type - The type of files (e.g., "idCard", "photo").
 * @param {boolean} props.isLoading - Indicates if the uploader is in a loading state.
 * @returns {JSX.Element} The rendered JSX element.
 */
const CustomFileUploader = ({
  onChange,
  onRemove,
  label,
  sublabel,
  files,
  type,
  isLoading,
}) => {
  const currentLanguage = getCurrentLanguage();
  const { t } = useTranslation();
  return (
    <div className="custom-file-uploader-container">
      <div className="d-flex ">
        <Text color="primary" className="file-uploader-label-text" as="p">
          {label}:
        </Text>
        <Text className="text-input-required-star" color="danger">
          {"*"}
        </Text>
      </div>
      <Text color="primary" className="file-uploader-sublabel-text" as="p">
        {sublabel}
      </Text>
      <TTNewFileUpload
        isLoading={isLoading}
        dropzoneOptions={
          (type === "idCard" || type === "photo") && {
            maxFiles: 1,
            multiple: false,
          }
        }
        files={files}
        onChange={onChange}
        onRemove={onRemove}
        subTitleText={
          type === "photo"
            ? `(JPG; 1300 x 1600px; ${t("fileSize")} 1-5MB)`
            : `(${t("maxFileSize")} 5MB)`
        }
        titleText={
          isDeviceMobile ? (
            <span className="text-secondary">
              {t("mobile-file-upload-title")}
            </span>
          ) : currentLanguage === "est" ? (
            <>
              Manuse lisamiseks lohista failid siia{" "}
              <p className="text-secondary">Laadi arvutist</p>
            </>
          ) : (
            <>
              Drag file(s) here or{" "}
              <span className="text-secondary">upload from computer</span>
            </>
          )
        }
      />
    </div>
  );
};

export default CustomFileUploader;
