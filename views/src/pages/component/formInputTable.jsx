import React from "react";
import {
  Box, Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Typography, IconButton, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export default function InvoiceItemsTable({
  items,
  errors,
  onChangeItem,
  onAddItem,
  onRemoveItem,
  onAddPart,
  onSearchPart,
  calcLineTotal,
  total
}) {
  return (
    <Box mt={3}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>كود الجزء</TableCell>
            <TableCell>اسم الجزء</TableCell>
            <TableCell>الكمية</TableCell>
            <TableCell>السعر</TableCell>
            <TableCell>إجمالي السطر</TableCell>
            <TableCell>إجراء</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((it, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  value={it.part_number}
                  onChange={(e) => onChangeItem(idx, "part_number", e.target.value)}
                  size="small"
                  error={!!errors[`item_part_${idx}`]}
                  helperText={errors[`item_part_${idx}`]}
                  sx={{ width: 100 }}
                />
                <IconButton color="primary" onClick={() => onSearchPart(idx)}>
                  <SearchIcon fontSize="small" />
                </IconButton>
                <IconButton color="primary" onClick={() => onAddPart(idx)}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                <Typography color={it.part_name ? "green" : "gray"}>
                  {it.part_name || "—"}
                </Typography>
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  size="small"
                  value={it.quantity}
                  onChange={(e) => onChangeItem(idx, "quantity", e.target.value)}
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  size="small"
                  value={it.price}
                  onChange={(e) => onChangeItem(idx, "price", e.target.value)}
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell>{calcLineTotal(it).toFixed(2)}</TableCell>
              <TableCell>
                <IconButton onClick={() => onRemoveItem(idx)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6}>
              <Button startIcon={<AddCircleOutlineIcon />} onClick={onAddItem}>
                إضافة سطر
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Typography variant="h6">الإجمالي: {total.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
}
