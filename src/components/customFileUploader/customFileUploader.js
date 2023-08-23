import React from "react";
import { TTNewFileUpload, Text } from "taltech-styleguide";
import "./style.css";
import { getCurrentLanguage } from "../../localization/i18n.config";
const CustomFileUploader = ({ onChange, onRemove, label, sublabel, files }) => {
  const currentLanguage = getCurrentLanguage();

  return (
    <div className="custom-file-uploader-container">
      <div className="d-flex">
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
        files={files}
        onChange={onChange}
        onRemove={onRemove}
        subTitleText="(Max file size 5MB)"
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
