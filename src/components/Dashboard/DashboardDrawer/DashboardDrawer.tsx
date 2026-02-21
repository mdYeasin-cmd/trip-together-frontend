"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "../Sidebar/Sidebar";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const drawerWidth = 240;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const userInfo = getUserInfo() as
    | {
        id?: string;
        name?: string;
        role?: string;
      }
    | undefined;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 0,
          color: "#FFF",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" noWrap component="div">
              Hi, {userInfo?.name}
            </Typography>
            <Typography variant="body2" noWrap component="div">
              Welcome To, Trip Together
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              href="/"
              variant="outlined"
              color="inherit"
              startIcon={<HomeRoundedIcon />}
              sx={(theme) => ({
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 999,
                px: { xs: 1.25, sm: 2 },
                py: { xs: 0.5, sm: 0.75 },
                minWidth: 0,
                borderColor: "rgba(255,255,255,0.7)",
                color: "#FFF",
                backgroundColor: "rgba(255,255,255,0.06)",
                transition: theme.transitions.create(
                  ["background-color", "border-color", "transform"],
                  {
                    duration: theme.transitions.duration.short,
                  }
                ),
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.95)",
                  backgroundColor: "rgba(255,255,255,0.14)",
                  transform: "translateY(-1px)",
                },
              })}
            >
              Go Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
