"use client";

import { assets } from "@/assets";
import { Logo } from "@/components/Shared/Logo/Logo";
import { colors } from "@/constants";
import { registerTraveler } from "@/services/actions/registerTraveler";
import { IUserData } from "@/types";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserData>();

  const onSubmit: SubmitHandler<IUserData> = async (data) => {
    console.log(data, "regist data");
    try {
      const res = await registerTraveler(data);

      console.log(res, "response");
      if (res.success) {
        toast.success(res.message);
        router.push("/login");
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

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                  <Grid container spacing={2} my={1}>
                    <Grid item xs={12}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        {...register("name")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="email"
                        {...register("email")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="password"
                        {...register("password")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="password"
                        {...register("confirmPassword")}
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
              </form>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
