"use client";

import { assets } from "@/assets";
import TTForm from "@/components/Forms/TTForm";
import TTInput from "@/components/Forms/TTInput";
import { Logo } from "@/components/Shared/Logo/Logo";
import { colors } from "@/constants";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState();

  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await userLogin(data);

      if (res.success) {
        toast.success(res.message);
        storeUserInfo({ accessToken: res?.data?.token });
        router.push("/dashboard");
      } else {
        setError(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Stack
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        height={"100%"}
        gap={2}
      >
        <Box
          sx={{
            flex: 1,
            height: "505px",
            borderRadius: 2,
          }}
        >
          <Image
            src={assets.jaflongImage}
            alt="jaflong"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              borderRadius: "1rem",
            }}
          />
        </Box>
        <Box sx={{ flex: 1, borderRadius: 2 }}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Box
              sx={{
                width: "100%",
                boxShadow: 1,
                borderRadius: 1,
                p: 4,
                textAlign: "center",
              }}
            >
              <Stack justifyContent={"center"} alignItems={"center"}>
                <Box>
                  <Logo />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color={colors.SECONDARY}
                  >
                    Login Your Account
                  </Typography>
                </Box>
              </Stack>

              {error && (
                <Box>
                  <Typography
                    sx={{
                      backgroundColor: "red",
                      padding: "1px",
                      borderRadius: "2px",
                      color: "white",
                      marginTop: "5px",
                    }}
                  >
                    {error}
                  </Typography>
                </Box>
              )}

              <TTForm
                onSubmit={handleLogin}
                resolver={zodResolver(loginValidationSchema)}
                defaultValues={defaultValues}
              >
                <Box>
                  <Grid container spacing={2} my={1}>
                    <Grid item xs={12}>
                      <TTInput
                        label="Email"
                        type="email"
                        fullWidth={true}
                        name="email"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TTInput
                        label="Password"
                        type="password"
                        fullWidth={true}
                        name="password"
                      />
                    </Grid>
                  </Grid>

                  <Typography textAlign={"end"} component="p" fontWeight={300}>
                    <Link style={{ color: colors.PRIMARY }} href={"/register"}>
                      Forgot Password?
                    </Link>
                  </Typography>

                  <Button
                    type="submit"
                    sx={{ margin: "20px 0px" }}
                    fullWidth={true}
                  >
                    Login
                  </Button>

                  <Typography component="p" fontWeight={300} mt={2}>
                    Don&apos;t have an account?{" "}
                    <Link style={{ color: colors.PRIMARY }} href={"/register"}>
                      Create an account
                    </Link>
                  </Typography>
                </Box>
              </TTForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
