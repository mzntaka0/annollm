import React, { useCallback } from "react";
import {
  Button,
  Stack,
  Typography,
  IconButton,
  Dialog as MuiDialog,
  DialogActions,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "@mui/material";

const styles = {
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "540px",
    height: "fit-content",
    maxHeight: "500px",
    background: "#FFFFFF",
    overflow: "hidden",
    borderRadius: "4px",
  },
  content: {
    p: (theme: Theme) => theme.spacing(3),
    overflowY: "auto",
    boxSizing: "border-box",
    height: "calc(100% - 60px)",
  },
} as const;

type DialogProps = {
  title: string;
  color?: "primary" | "secondary" | "error";
  children: React.ReactNode;
  onOk: () => void;
  okText?: string;
  cancelText?: string;
  footer?: boolean;
  width?: string;
  loading?: boolean;
};

const useDialog = (): {
  open: () => void;
  close: () => void;
  // eslint-disable-next-line
  Dialog: (props: DialogProps) => JSX.Element;
} => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    open,
    close,
    Dialog: useCallback(
      (props: DialogProps) => {
        const {
          children,
          title,
          onOk,
          color = "primary",
          okText = "はい",
          cancelText = "キャンセル",
          footer = false,
          width = "540px",
          loading = false,
        } = props;
        return (
          <MuiDialog sx={styles.modal} open={isOpen} onClose={close}>
            <Box sx={{ ...styles.container, width }}>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  boxSizing: "border-box",
                  height: "60px",
                  background: (theme: Theme) => theme.palette[color].main,
                  p: (theme: Theme) => theme.spacing(0, 2, 0, 3),
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
              <Box sx={styles.content}>{children}</Box>
            </Box>
            {footer ? (
              <DialogActions sx={{ background: "#FFFFFF" }}>
                <Button
                  color={color}
                  variant="contained"
                  onClick={onOk}
                  startIcon={loading ? <CircularProgress size={15} /> : null}
                  disabled={loading}
                >
                  {okText}
                </Button>
                <Button color={color} variant="outlined" onClick={close}>
                  {cancelText}
                </Button>
              </DialogActions>
            ) : null}
          </MuiDialog>
        );
      },
      [open, close, isOpen]
    ),
  };
};

export default useDialog;
