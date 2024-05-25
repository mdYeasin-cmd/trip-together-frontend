"use client";

import { assets } from "@/assets";
import { Logo } from "@/components/Shared/Logo/Logo";
import { colors } from "@/constants";
import { userLogin } from "@/services/actions/userLogin";
import { IUserCredentials } from "@/types";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>();

  const onSubmit: SubmitHandler<IUserCredentials> = async (data) => {
    try {
      const res = await userLogin(data);

      console.log(res, "response");
      if (res.success) {
        toast.success(res.message);
        // router.push("/dashboard");
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

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                  <Grid container spacing={2} my={1}>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        {...register("email")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        {...register("password")}
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
              </form>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
