import React from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import useModal from "lib/hooks/useModal";
import ModalContent from "./ModalContent";

const Component: React.FC = () => {
  const { open, close, Modal } = useModal();
  return (
    <>
      <Button startIcon={<Add />} onClick={open}>
        Create a project
      </Button>
      <Modal title="Create a project">
        <ModalContent onClose={close} />
      </Modal>
    </>
  );
};

export default Component;
