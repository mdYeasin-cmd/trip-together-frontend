"use client";

import { colors } from "@/constants";
import { getUserInfo, removeUser } from "@/services/auth.service";
import { getInitials } from "@/utils/avatar";
import { capitalizeFirstLetter } from "@/utils/text-transform";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfo() as
    | {
        id?: string;
        name?: string;
        role?: string;
      }
    | undefined;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    removeUser();
    router.push("/login");
    router.refresh();
  };

  const profileHref = userInfo?.role
    ? `/dashboard/${userInfo.role}`
    : "/dashboard";

  return (
    <>
      {userInfo?.id ? (
        <>
          <IconButton
            onClick={handleOpen}
            size="small"
            sx={{ p: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                bgcolor: colors.PRIMARY,
                width: 36,
                height: 36,
              }}
              alt={userInfo?.name || "User"}
            >
              {getInitials(userInfo?.name)}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1,
                minWidth: 270,
                borderRadius: 2,
                boxShadow: 3,
                border: "1px solid #e6f3f1",
                overflow: "visible",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                  borderLeft: "1px solid #e6f3f1",
                  borderTop: "1px solid #e6f3f1",
                },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  alt={userInfo?.name || "User"}
                  sx={{ bgcolor: colors.PRIMARY, width: 44, height: 44 }}
                >
                  {getInitials(userInfo?.name)}
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={700} noWrap>
                    {userInfo?.name || "Account"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {capitalizeFirstLetter(userInfo?.role as string) || "user"}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider />

            <MenuItem component={Link} href={profileHref} onClick={handleClose}>
              <ListItemIcon>
                <PersonRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>

            <MenuItem
              component={Link}
              href={"/dashboard"}
              onClick={handleClose}
            >
              <ListItemIcon>
                <DashboardRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button component={Link} href={"/login"}>
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
