"use client";

import { Logo } from "@/components/Shared/Logo/Logo";
import { colors } from "@/constants";
import { Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Nabvar = () => {
  const AuthButton = dynamic(
    () => import("@/components/Shared/AuthButton/AuthButton"),
    { ssr: false }
  );
  const pathname = usePathname();

  return (
    <Stack
      sx={{
        // borderBottom: "1px solid lightgray",
        // backgroundColor: "#d8efec",
        // boxShadow: 1,
        borderBottom: "1px solid #c4e7e3",
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
                  pathname === "/travels" ? `2px solid ${colors.PRIMARY} ` : "",
              }}
              component={Link}
              href={"/travels"}
            >
              Travels
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

            <AuthButton />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Nabvar;
