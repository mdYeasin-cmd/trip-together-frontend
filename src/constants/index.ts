export const colors = {
  PRIMARY: "#3AB0A2",
  SECONDARY: "#35A29F",
  WHITE: "#FFFFFF",
  LIGHTGRAY: "lightgray",
};

export const dataGridHeaderDesign = {
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: colors.SECONDARY,
    color: colors.WHITE,
    fontSize: "14px",
  },
  // "& .MuiSvgIcon-root": {
  //   color: colors.WHITE,
  // },
};

export const BACKEND_API_URL = process.env
  .NEXT_PUBLIC_BACKEND_API_URL as string;

export const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY as string;

export const UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED",
};
