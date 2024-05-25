import { colors } from "@/constants";
import { getUserInfo, removeUser } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfo();
  const handleLogout = () => {
    removeUser();
    router.refresh();
  };
  return (
    <>
      {userInfo?.id ? (
        <Button
          onClick={handleLogout}
          sx={{ backgroundColor: colors.SECONDARY }}
        >
          Logout
        </Button>
      ) : (
        <Button component={Link} href={"/login"}>
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
