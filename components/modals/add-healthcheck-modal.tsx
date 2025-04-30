import React from "react";
import { Modal } from "../ui/modal";

interface AddHealthCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddHealthCheckModal({ isOpen, onClose }: AddHealthCheckModalProps) {
  return (
    <Modal
      title="Health Check"
      description="Add a health check for the patient"
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-[500px] md:max-w-[600px] w-full max-h-[90vh] overflow-auto"
    >
      <div>fdfdf</div>
    </Modal>
  );
}

export default AddHealthCheckModal;
