import React from "react";
import Link from "next/link";
import { Stack, Button } from "@mui/material";
import { Theme } from "@mui/material/styles";

import Logo from "components/common/Logo";
//import { pagesPath } from "lib/$path";

type Props = {
  height: string;
};

const Header: React.FC<Props> = (props) => {
  const { height } = props;
  return (
    <Stack
      sx={{
        height,
        width: "100vw",
        p: (theme: Theme) => theme.spacing(0, 3, 0, 3),
        backgroundColor: "main",
        backdropFilter: "blur(5.8px)",
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.25)",
      }}
      direction="row"
      spacing={3}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack>
        <Link href="/" passHref>
          <Stack
            height="100%"
            justifyContent="center"
            sx={{ cursor: "pointer" }}
          >
            <Logo width="70px" />
          </Stack>
        </Link>
      </Stack>
      <Stack>
        <Button>Login</Button>
      </Stack>
    </Stack>
  );
};

export default Header;
