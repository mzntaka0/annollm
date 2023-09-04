import React from "react";
import type { Metadata } from "next";

import { staticPath } from "lib/$path";
import "./globals.css";
import { MuiSetup } from "./MuiSetup";
//import theme from "./theme";

export const metadata: Metadata = {
  title: "annollm",
  icons: [{ rel: "shortcut icon", url: staticPath.favicon_ico }],
  //themeColor: theme.palette.primary.main,
};

// NOTE: https://github.com/mui/material-ui/issues/34898
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* TODO: modify here ref. https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta name="emotion-insertion-point" content="" />
      </Head>*/}
      <body>
        <MuiSetup>{children}</MuiSetup>
      </body>
    </html>
  );
}

export default RootLayout;
