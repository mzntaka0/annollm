import React from "react";
import { Stack } from "@mui/material";

import { staticPath } from "lib/$path";

type Props = {
  height?: string;
  width?: string;
};

const Component: React.FC<Props> = (props) => {
  const { width = "100%", height = "100%" } = props;
  return (
    <Stack justifyContent="center" sx={{ width, height }}>
      <img src={staticPath.logo_svg} width="100%" height="100%" />
    </Stack>
  );
};

export default Component;
