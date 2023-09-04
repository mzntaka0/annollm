import React from "react";
import {
  Stack,
  Typography,
  IconButton,
  Modal as MuiModal,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "@mui/material";

type ModalProps = {
  title: string;
  color?: "primary" | "secondary" | "error";
  children: React.ReactNode;
  width?: string;
};

const useModal = (): {
  open: () => void;
  close: () => void;
  Modal: (props: ModalProps) => JSX.Element;
} => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    open,
    close,
    Modal: React.useCallback(
      (props: ModalProps) => {
        const { children, title, color = "primary", width = "540px" } = props;
        return (
          <MuiModal
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={isOpen}
            keepMounted
          >
            <Box
              sx={{
                height: "fit-content",
                maxHeight: "800px",
                //background: "#FFFFFF",
                borderRadius: "4px",
                overflowY: "hidden",
                width,
                background: "rgba(255, 255, 255, 0.63)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(4.8px)",
                WebkitBackdropFilter: "blur(6.8px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.5)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <Stack
                direction="row"
                spacing={4}
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  width: "100%",
                  height: "60px",
                  boxSizing: "border-box",
                  background: (theme: Theme) => theme.palette[color].main,
                  p: (theme: Theme) => theme.spacing(0, 3),
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                  >
                    {title}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={close}>
                    <CloseIcon
                      sx={{ m: 0, cursor: "pointer", color: "#FFFFFF" }}
                    />
                  </IconButton>
                </Box>
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "800px",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    p: (theme: Theme) => theme.spacing(3),
                    boxSizing: "border-box",
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </MuiModal>
        );
      },
      [open, close, isOpen],
    ),
  };
};

export default useModal;
