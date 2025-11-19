import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Table, TableHead, TableBody, TableRow, TableCell, Button
} from "@mui/material";

function FormDialogSearch({
  open, onClose, searchTerm, onSearch, partsList, onSelect
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" dir="rtl">
      <DialogTitle>بحث عن جزء</DialogTitle>
      <DialogContent>
        <TextField
          label="بحث"
          fullWidth
          margin="dense"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="اكتب كود أو اسم الجزء..."
        />
        <Table size="small" sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>الكود</TableCell>
              <TableCell>الاسم</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>اختيار</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partsList.map((p) => (
              <TableRow key={p.code}>
                <TableCell>{p.code}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => onSelect(p)}>
                    اختيار
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {partsList.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ color: "gray" }}>
                  لا توجد نتائج
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إغلاق</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialogSearch