import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HttpClient from "../../api/httpclient";
import { updateForm } from "../../redux/actions/app.actions";
import { TTNewButton, Text } from "taltech-styleguide";
import { useTranslation } from "react-i18next";

const ProfilePhotoUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [profilPhotoUploading, setProfilPhotoUploading] = useState(false);
  const { formFields, token } = useSelector((state) => state.app);
  const updateFormFields = (payload) => {
    dispatch(updateForm(payload));
  };
  const { t } = useTranslation();

  const onProfilePhotoUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "image/jpeg") {
        try {
          setProfilPhotoUploading(true);
          let data = new FormData();
          data.append("file", selectedFile);
          data.append("context", "profilePhoto");
          const res = await HttpClient.Post("/file", data);

          const response = await fetch(
            `https://taltech.appit.cloud/api/file?path=${res.path}&context=profilePhoto`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);

          const uploadedImg = {
            name: selectedFile.name,
            img: imageObjectURL,
            path: res.path,
          };
          updateFormFields({ profilePhoto: uploadedImg });
        } catch (error) {
          console.log(error);
        } finally {
          setProfilPhotoUploading(false);
        }
      } else {
        alert(t("select_jpeg_error"));
      }
    }
  };

  const onPhotoRemove = async () => {
    await HttpClient.Delete("/file", {
      path: formFields.profilePhoto.path,
    });
    fileInputRef.current.value = null;
    updateFormFields({ profilePhoto: null });
  };
  return (
    <div
      className={`photo-upload-container ${
        formFields.profilePhoto?.img ? "mobile-photo-upload-container" : ""
      }`}
    >
      <Text className="photo-text" color="primary">
        {t("photo")}:{" "}
        <Text as="span" className="text-input-required-star" color="danger">
          *
        </Text>
      </Text>
      {formFields.profilePhoto ? (
        <div>
          <img
            className="page1-profile-photo"
            src={formFields?.profilePhoto?.img}
            alt="Profile"
          />
          <br />
          <TTNewButton
            className="page1-remove"
            onClick={onPhotoRemove}
            variant="link"
          >
            {t("remove")}
          </TTNewButton>
        </div>
      ) : profilPhotoUploading ? (
        <Text className="upload-photo-format-text" color="gray-600">
          {t("file_uploading")}
        </Text>
      ) : (
        <label className="upload-photo-label" for="upload-photo" class="btn">
          <Text as="span" className="upload-photo-placeholder-text">
            {t("upload-file")}
          </Text>
          <br />
          <Text className="upload-photo-format-text" color="gray-600">
            (JPG)
          </Text>
        </label>
      )}
      <input
        accept=".jpg, .jpeg"
        ref={fileInputRef}
        onChange={onProfilePhotoUpload}
        id="upload-photo"
        className="photo-upload-input"
        type="file"
      />
    </div>
  );
};

export default ProfilePhotoUploader;
