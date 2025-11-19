import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { arSD } from '@mui/x-data-grid/locales';
import DeleteIcon from "@mui/icons-material/Delete";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import InfoIcon from "@mui/icons-material/Info";


function DataGridST({
  urlApiget,
  title = "",
  headerData = "",
  urlApidelete,
  urlView = ""
}) {

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  // Fetch data from your backend
  useEffect(() => {
    urlApiget()
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Delete row
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا السجل؟")) return;
    try {
      await urlApidelete(id); // 🔹 API delete endpoint
      setRows((prev) => prev.filter((row) => row.id !== id)); // remove locally
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };
  // Define columns
  const columns = [
    {
      field: "autoNumber",
      headerName: "#",
      width: 50,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const index = rows.findIndex((r) => r.id === params.id);
        return index === -1 ? "" : index + 1;
      },
    },
    ...headerData,
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => navigate(`${urlView}/info/${params.row.id}`)}
          >
            {" "}
            <InfoIcon />{" "}
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => navigate(`${urlView}/update/${params.row.id}`)}
          >
            {" "}
            <ModeEditIcon />{" "}
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            {" "}
            <DeleteIcon />{" "}
          </IconButton>
        </Stack>
      ),
    },
  ];
  return (
    <Box sx={{ direction: "rtl", backgroundColor: "#f8f9fa", }}>
      <Stack direction={"row"}>
        <Typography variant="h3">{title}</Typography>
        <Box flexGrow={1} />
        <Button color="primary" onClick={() => navigate(`${urlView}/new`)}>
          <AddToQueueIcon />

        </Button>

      </Stack>
      <Box
        sx={{
          maxWidth: "95%",
          mx: "auto",
          mt: 2,
          pb: 3,
        }}
      >
        <Paper sx={{ p: 1, borderRadius: 2, boxShadow: 3 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            localeText={arSD.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            // checkboxSelection
            disableRowSelectionOnClick
            showToolbar
            columnHeaderHeight={36}
            // rowHeight={25}
            getRowHeight={() => "auto"}
            sx={{
              borderRadius: 3,
              "& .MuiDataGrid-cell": { textAlign: "center" },
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
                fontSize: "15px",
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default DataGridST;
