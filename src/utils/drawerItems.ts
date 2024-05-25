import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";

//icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";
import FeedIcon from "@mui/icons-material/Feed";
import GroupsIcon from "@mui/icons-material/Groups";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "My Profile",
          path: `${role}`,
          icon: AccountBoxIcon,
        },
        {
          title: "User Management",
          path: `${role}/user-management`,
          icon: GroupsIcon,
        },
        {
          title: "Trip Management",
          path: `${role}/trip-management`,
          icon: ConnectingAirportsIcon,
        }
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "My Profile",
          path: `${role}`,
          icon: AccountBoxIcon,
        },
        {
          title: "User Management",
          path: `${role}/user-management`,
          icon: GroupsIcon,
        },
        {
          title: "Trip Management",
          path: `${role}/trip-management`,
          icon: ConnectingAirportsIcon,
        }
      );
      break;

    case USER_ROLE.TRAVELER:
      roleMenus.push(
        {
          title: "My Profile",
          path: `${role}`,
          icon: AccountBoxIcon,
        },
        {
          title: "Travel Posts",
          path: `${role}/travel-posts`,
          icon: FeedIcon,
        },
        {
          title: "Travel Request History",
          path: `${role}/travel-request-history`,
          icon: HistoryIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus];
};
