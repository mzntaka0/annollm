import React from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
// NOTE: for mock
import { useSetAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";

import { Schema, FormType } from "./validators";
import { mockAtom } from "components/index/common/atoms/mocks";

//dayjs.locale("ja");

type Props = {
  defaultValues?: FormType;
};

const Form: React.FC<Props> = (props) => {
  const {
    defaultValues = {
      instruction: "",
      input: "",
      output: "",
    },
  } = props;

  const setMock = useSetAtom(mockAtom);
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, formState, reset } = useForm<FormType>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    setMock((prev) => [
      ...prev,
      {
        id: uuidv4(),
        ...values,
      },
    ]);
    reset();
  };

  return (
    <Stack width="100%">
      <Stack width="95%" direction="row" justifyContent="flex-end">
        <Box>
          <Button>Templates</Button>
        </Box>
      </Stack>
      <Box width="100%" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          justifyContent="center"
          alignItems="center"
          width="100%"
          spacing={3}
        >
          <Stack width="95%" direction="row" spacing={2}>
            <FormControl sx={{ width: "100%" }}>
              <Typography variant="caption">Instruction</Typography>
              <Controller
                name="instruction"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                      }}
                      multiline
                      rows={5}
                      margin="none"
                      size="small"
                      {...field}
                    />
                  );
                }}
              />
              {formState.errors.instruction && (
                <Box
                  sx={{
                    color: "error.main",
                    fontSize: "14px",
                  }}
                  role="alert"
                >
                  {formState.errors.instruction?.message}
                </Box>
              )}
            </FormControl>
          </Stack>
          <Stack width="95%" direction="row" spacing={2}>
            <FormControl sx={{ width: "100%" }}>
              <Typography variant="caption">Input</Typography>
              <Controller
                name="input"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                      }}
                      multiline
                      rows={5}
                      margin="none"
                      size="small"
                      {...field}
                    />
                  );
                }}
              />
              {formState.errors.input && (
                <Box
                  sx={{
                    color: "error.main",
                    fontSize: "14px",
                  }}
                  role="alert"
                >
                  {formState.errors.input?.message}
                </Box>
              )}
            </FormControl>
          </Stack>
          <Stack width="95%" direction="row" spacing={2}>
            <FormControl sx={{ width: "100%" }}>
              <Typography variant="caption">Output</Typography>
              <Controller
                name="output"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                      }}
                      multiline
                      rows={5}
                      margin="none"
                      size="small"
                      {...field}
                    />
                  );
                }}
              />
              {formState.errors.output && (
                <Box
                  sx={{
                    color: "error.main",
                    fontSize: "14px",
                  }}
                  role="alert"
                >
                  {formState.errors.output?.message}
                </Box>
              )}
            </FormControl>
          </Stack>
          <Stack
            sx={{
              boxSizing: "border-box",
              width: "95%",
            }}
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
            direction="row"
          >
            <Button
              type="submit"
              variant="contained"
              disabled={formState.isSubmitting || !formState.isValid}
              //disabled={formState.isSubmitting}
              startIcon={
                formState.isSubmitting ? <CircularProgress size={15} /> : null
              }
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Form;
