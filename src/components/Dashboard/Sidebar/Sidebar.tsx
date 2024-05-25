import { List, Box, Stack } from "@mui/material";
import { Logo } from "@/components/Shared/Logo/Logo";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SideBarItem from "./SideBarItem";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        sx={{
          py: 1,
        }}
        component={Link}
        href="/"
      >
        <Logo />
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SideBarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
