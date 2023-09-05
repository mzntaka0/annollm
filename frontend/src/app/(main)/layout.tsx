"use client";

import React from "react";
import { Stack } from "@mui/material";
import Headroom from "react-headroom";

import Header from "./Header";
import Providers from "./Providers";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { children } = props;
  const headerHeight = "72px";
  return (
    <>
      <Providers>
        <Headroom>
          <Header height={headerHeight} />
        </Headroom>
        <Stack
          sx={{
            p: 3,
            pl: 0,
            width: "100vw",
            height: `calc(100vh - ${headerHeight})`,
          }}
        >
          {children}
        </Stack>
      </Providers>
    </>
  );
};

export default Layout;
