import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, TTNewButton } from "taltech-styleguide";
import "./modalStyle.css";

const ModalComponent = ({
  isVisible,
  onHide,
  title,
  onConfirm,
  onCancel,
  bodyText,
  confirmText,
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      className="model-component"
      show={isVisible}
      onHide={onHide}
      onBackdropClick={onCancel}
      onExit={onCancel}
    >
      <Modal.Header onHide={onCancel} closeButton>
        {title}
      </Modal.Header>
      {bodyText && <Modal.Body>{bodyText}</Modal.Body>}
      <Modal.Footer>
        <TTNewButton isLoading={isLoading} onClick={onConfirm}>
          {confirmText}
        </TTNewButton>
        <TTNewButton onClick={onCancel} variant="link">
          {t("cancel")}
        </TTNewButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
