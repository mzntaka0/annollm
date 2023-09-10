import React from "react";
import { Stack, IconButton, Button, Divider } from "@mui/material";
import { Edit, Delete, Download } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAtomValue } from "jotai";

import { mockAtom } from "components/index/common/atoms/mocks";

const Component: React.FC = () => {
  const mocks = useAtomValue(mockAtom);
  const columns: GridColDef[] = [
    {
      field: "instruction",
      headerName: "Instruction",
      minWidth: 200,
      flex: 0.15,
      //renderCell: (params: GridRenderCellParams) => {
      //  //const { row } = params;
      //  return "aaa";
      //},
    },
    {
      field: "input",
      headerName: "Input",
      minWidth: 200,
      flex: 0.15,
      //renderCell: (params: GridRenderCellParams) => {
      //  //const { row } = params;
      //  return "aaa";
      //},
    },
    {
      field: "output",
      headerName: "Output",
      minWidth: 200,
      flex: 0.15,
      //renderCell: (params: GridRenderCellParams) => {
      //  //const { row } = params;
      //  return "aaa";
      //},
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <>
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton sx={{ color: "error.main" }}>
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ].map((value) => ({
    ...value,
    headerClassName: "super-app-theme--header",
  }));
  return (
    <Stack width="100%">
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={1}>
        <Button>Upload a file</Button>
        <Button disabled>Generate</Button>
        <Divider orientation="vertical" />
        <Button startIcon={<Download />}>Export as JSON</Button>
      </Stack>
      <DataGrid
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          borderRadius: "0px 0px 4px 4px",
          overflow: "hidden",
        }}
        columns={columns}
        rows={mocks}
        pagination
        hideFooterSelectedRowCount
      />
    </Stack>
  );
};

export default Component;
