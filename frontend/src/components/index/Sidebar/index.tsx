import React from "react";
import { Stack, Button } from "@mui/material";

import CreateProjectButton from "./CreateProjectButton";

const Component: React.FC = () => {
  return (
    <Stack
      sx={{
        width: "300px",
        height: "100%",
        bgcolor: "#FFFFFF",
        borderRadius: "0px 16px 16px 0px",
        //boxShadow: "1px 10px 30px 15px rgba(206, 224, 238, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.13)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(6.8px)",
        WebkitBackdropFilter: "blur(6.8px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <Stack
        sx={{
          p: 3,
        }}
        height="100%"
        spacing={3}
      >
        <CreateProjectButton />
        <Stack
          sx={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Button>規程・契約アノテーション</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Component;
