import React from "react";
import { Stack, Divider } from "@mui/material";

import Sidebar from "./Sidebar";
import AnnotationForm from "./AnnotationForm";
import DatasetTable from "./DatasetTable";

const Component: React.FC = () => {
  return (
    <Stack spacing={3} height="100%" direction="row">
      <Sidebar />
      <Stack width="100%" height="100%" direction="row" spacing={3}>
        <AnnotationForm />
        <Divider orientation="vertical" />
        <DatasetTable />
      </Stack>
    </Stack>
  );
};

export default Component;
