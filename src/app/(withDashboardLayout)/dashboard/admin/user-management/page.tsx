"use client";

import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from "@/redux/api/usersApi";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserStatus, dataGridHeaderDesign } from "@/constants";
import { IUserData } from "@/types";
import { useState } from "react";
import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import { toast } from "sonner";

const UserManagementPage = () => {
  const [openUserBlockAlert, setOpenUserBlockAlert] = useState(false);
  const [userDetails, setUserDetails] = useState<Partial<IUserData>>({});

  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [changeUserStatus] = useChangeUserStatusMutation();

  const users = data;

  const handleUserBlock = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const userBlockData = {
        userId: userDetails.id,
        status: UserStatus.BLOCKED,
      };

      const res = await changeUserStatus(userBlockData).unwrap();

      if (res.id) {
        toast.success(`User is blocked successfully`, { id: toastId });
        setOpenUserBlockAlert(false);
        setUserDetails({});
      }
    } catch (error) {
      toast.error("User blocked process is failed", { id: toastId });
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "index_id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            {row.status === UserStatus.ACTIVE ? (
              <Button
                onClick={() => {
                  setOpenUserBlockAlert(true);
                  setUserDetails(row);
                }}
                size="small"
                sx={{ py: "3px", px: 0, mr: 2 }}
              >
                Block
              </Button>
            ) : (
              <Button
                // onClick={() => {
                //   setOpenUserBlockAlert(true);
                //   setUserDetails(row);
                // }}
                size="small"
                sx={{ py: "3px", px: 0, mr: 2 }}
              >
                Active
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  const rows = users?.map((user: IUserData, index: number) => ({
    ...user,
    index_id: index + 1,
  }));

  return (
    <>
      <Box>
        {!isLoading ? (
          <Box sx={{ mt: 2 }}>
            <DataGrid rows={rows} columns={columns} sx={dataGridHeaderDesign} />
          </Box>
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>

      <TTAlert
        message={`Are you sure you want to block ${userDetails?.name}?`}
        open={openUserBlockAlert}
        setOpen={setOpenUserBlockAlert}
        onYesClick={handleUserBlock}
      />
    </>
  );
};

export default UserManagementPage;
