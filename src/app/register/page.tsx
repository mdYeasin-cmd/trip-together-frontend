"use client";

import { assets } from "@/assets";
import TTForm from "@/components/Forms/TTForm";
import TTInput from "@/components/Forms/TTInput";
import { Logo } from "@/components/Shared/Logo/Logo";
import { colors } from "@/constants";
import { registerTraveler } from "@/services/actions/registerTraveler";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const registerValidationSchema = z
  .object({
    name: z.string().min(1, "Please enter your name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password don't match with your password.",
    path: ["confirmPassword"],
  });

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (data: FieldValues) => {
    try {
      const res = await registerTraveler(data);

      if (res?.success) {
        toast.success(res?.message);
        const result = await userLogin({
          email: data.email,
          password: data.password,
        });

        if (result?.data?.token) {
          storeUserInfo({ accessToken: result?.data?.token });
          router.push("/");
        }
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
                    Register Your Account
                  </Typography>
                </Box>
              </Stack>

              <TTForm
                onSubmit={handleRegister}
                resolver={zodResolver(registerValidationSchema)}
                defaultValues={defaultValues}
              >
                <Box>
                  <Grid container spacing={2} my={1}>
                    <Grid item xs={12}>
                      <TTInput label="Name" fullWidth={true} name="name" />
                    </Grid>

                    <Grid item xs={12}>
                      <TTInput
                        label="Email"
                        fullWidth={true}
                        type="email"
                        name="email"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TTInput
                        label="Password"
                        fullWidth={true}
                        type="password"
                        name="password"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TTInput
                        label="Confirm Password"
                        name="confirmPassword"
                        fullWidth={true}
                        type="password"
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    sx={{ margin: "20px 0px" }}
                    fullWidth={true}
                  >
                    Register
                  </Button>

                  <Typography component="p" fontWeight={300} mt={2}>
                    Do you already have an account?{" "}
                    <Link style={{ color: colors.PRIMARY }} href={"/login"}>
                      Login
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

export default RegisterPage;
