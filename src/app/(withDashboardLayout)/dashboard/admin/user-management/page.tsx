"use client";

import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { dataGridHeaderDesign } from "@/constants";
import { IUserData } from "@/types";
import { useState } from "react";
import TTAlert from "@/components/Shared/TTAlert/TTAlert";

const UserManagementPage = () => {
  const [openStatusAlert, setOpenStatusAlert] = useState(false);

  const { data, isLoading } = useGetAllUsersQuery(undefined);

  const users = data;

  const handleUserDelete = (userId: string) => {};

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
            <Button
              onClick={() => setOpenStatusAlert(true)}
              size="small"
              sx={{ py: "3px", px: 0, mr: 2 }}
            >
              Block
            </Button>

            <IconButton
              onClick={() => handleUserDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
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
        message={`Are you sure you want to block this user? If you are not sure you want to block this user`}
        open={openStatusAlert}
        setOpen={setOpenStatusAlert}
        onYesClick={() => {
          setOpenStatusAlert(false);
        }}
      />
    </>
  );
};

export default UserManagementPage;
