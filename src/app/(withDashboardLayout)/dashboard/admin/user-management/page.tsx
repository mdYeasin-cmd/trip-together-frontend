"use client";

import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { dataGridHeaderDesign } from "@/constants";

const UserManagementPage = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  const users = data;

  const handleUserDelete = (userId: string) => {};

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <IconButton
            onClick={() => handleUserDelete(row.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box sx={{ mt: 2 }}>
          <DataGrid rows={users} columns={columns} sx={dataGridHeaderDesign} />
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </Box>
  );
};

export default UserManagementPage;
