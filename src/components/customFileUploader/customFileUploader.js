import React from "react";
import { TTNewFileUpload, Text } from "taltech-styleguide";
import "./style.css";
import { getCurrentLanguage } from "../../localization/i18n.config";
const CustomFileUploader = ({
  onChange,
  onRemove,
  label,
  sublabel,
  files,
  type,
}) => {
  const currentLanguage = getCurrentLanguage();

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
            ? "(JPG; 1300 x 1600px; file size 1-5MB)"
            : "(Max file size 5MB)"
        }
        titleText={
          currentLanguage === "est" ? (
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
