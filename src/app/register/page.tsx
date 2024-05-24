import { assets } from "@/assets";
import { Logo } from "@/components/Shared/Logo/Logo";
import { colors } from "@/constants";
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

const RegisterPage = () => {
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

              <form>
                <Box>
                  <Grid container spacing={2} my={1}>
                    <Grid item xs={12}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Mobile"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                      />
                    </Grid>
                  </Grid>

                  <Button sx={{ margin: "20px 0px" }} fullWidth={true}>
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
