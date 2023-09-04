import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Theme } from "@mui/material/styles";
import { useDropzone, type Accept } from "react-dropzone";

const styles = {
  dnd: {
    width: "100%",
    height: "100%",
    p: 2,
    border: "2px dashed rgba(200, 200, 200, 1.0)",
    boxSizing: "border-box",
    borderRadius: "4px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  dndContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
} as const;

type Options = {
  accept?: Accept;
  onClose?: () => void;
};

const useFileUploader = (options?: Options) => {
  const { accept = {}, onClose = undefined } = { ...options };

  const [files, setFiles] = React.useState<File[]>([]);
  const [urls, setUrls] = React.useState<string[]>([]);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) {
      return;
    }
    setFiles(acceptedFiles);
    setUrls(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);

  const reset = () => {
    setFiles([]);
    setUrls([]);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    //accept,
    onDrop,
  });

  const FileUploader = React.useMemo(() => {
    const Component: React.FC<{ disabled?: boolean }> = (props) => {
      const { disabled = false } = props;
      return (
        <>
          {files.length ? (
            <Stack width="100%">
              <Typography variant="caption">ファイル名</Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  background: "#EFEFEF",
                  color: "text.secondary",
                  p: (theme: Theme) => theme.spacing(1),
                  width: "100%",
                }}
              >
                <Box sx={{ overflowX: "auto" }} width="100%">
                  <Typography>
                    {files.map((file) => file?.name).join(", ")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <CancelIcon
                    onClick={() => {
                      acceptedFiles.length = 0;
                      acceptedFiles.splice(0, acceptedFiles.length);
                      setFiles([]);
                      setUrls([]);
                      if (onClose) {
                        onClose();
                      }
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
          ) : (
            <Box
              {...getRootProps({
                className: "dropzone",
                style: styles.dndContent,
              })}
              sx={styles.dnd}
            >
              <input type="file" {...getInputProps()} />
              {!isDragActive ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography>
                    クリックまたはドラッグアンドドロップでファイルを選択
                  </Typography>
                  <Typography variant="caption">
                    (
                    {Object.values(accept)
                      .flatMap((value) => value)
                      .join(", ")}
                    )
                  </Typography>
                </Box>
              ) : (
                <Stack alignItems="center" width="100%" height="100%">
                  <Typography>ドロップする</Typography>
                  <Typography variant="caption">
                    (
                    {Object.values(accept)
                      .flatMap((value) => value)
                      .join(", ")}
                    )
                  </Typography>
                </Stack>
              )}
              {isDragAccept ||
                (isDragReject && (
                  <Box>
                    <Box>ドロップ</Box>
                  </Box>
                ))}
            </Box>
          )}
        </>
      );
    };
    return Component;
  }, [
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    getInputProps,
    getRootProps,
    files,
  ]);
  return {
    FileUploader,
    files,
    urls,
    reset,
  };
};

export default useFileUploader;
