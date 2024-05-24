"use client";

import { Logo } from "@/components/UI/Logo/Logo";
import { colors } from "@/constants";
import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nabvar = () => {
  const pathname = usePathname();

  return (
    <Stack
      sx={{
        borderBottom: "1px solid lightgray",
      }}
    >
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Logo />

          <Stack
            direction={"row"}
            gap={4}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                borderBottom:
                  pathname === "/" ? `2px solid ${colors.PRIMARY} ` : "",
              }}
              component={Link}
              href={"/"}
            >
              Home
            </Typography>

            <Typography
              sx={{
                borderBottom:
                  pathname === "/about" ? `2px solid ${colors.PRIMARY}` : "",
              }}
              component={Link}
              href={"/about"}
            >
              About
            </Typography>

            <Typography
              sx={{
                borderBottom:
                  pathname === "/blog" ? `2px solid ${colors.PRIMARY}` : "",
              }}
              component={Link}
              href={"/blog"}
            >
              Blog
            </Typography>
            <Button component={Link} href={"/login"}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Nabvar;
