// InvoiceForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const emptyItem = () => ({
  part_number: "",
  quantity: 1,
  price: 0,
  part_name: "",
});

export default function InvoiceForm({ invoiceId, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    invoice_number: "",
    date: new Date().toISOString().slice(0, 10),
    customer_id: "",
    customer_name: "",
    store_id: "",
    store_name: "",
    invoice_type: "",
    invoice_type_name: "",
    items: [emptyItem()],
  });
  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [newRecord, setNewRecord] = useState({ code: "", name: "" });

  // تحميل بيانات الفاتورة عند التعديل
  useEffect(() => {
    if (invoiceId) {
      setLoading(true);
      axios
        .get(`/api/invoices/${invoiceId}`)
        .then((res) => {
          const data = res.data;
          setInvoice({
            invoice_number: data.invoice_number,
            date: data.date?.slice(0, 10),
            customer_id: data.customer_id,
            customer_name: data.customer_name,
            store_id: data.store_id,
            store_name: data.store_name,
            invoice_type: data.invoice_type,
            invoice_type_name: data.invoice_type_name,
            items: data.items.map((it) => ({
              part_number: it.part_number,
              part_name: it.part_name,
              quantity: it.quantity,
              price: it.price,
            })),
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [invoiceId]);

  // حساب الإجمالي
  const calcLine = (it) => Number(it.quantity || 0) * Number(it.price || 0);
  const total = invoice.items.reduce((sum, it) => sum + calcLine(it), 0);

  // تحديث الرأس
  const handleChange = (field) => (e) =>
    setInvoice((prev) => ({ ...prev, [field]: e.target.value }));

  // جلب الاسم من API
  const fetchName = async (type, code) => {
    if (!code) return "";
    try {
      const res = await axios.get(`/api/${type}/${code}`);
      return res.data.name || "";
    } catch {
      return "";
    }
  };

  // تحديث نوع المستند بالكود وجلب الاسم
  const handleTypeChange = async (e) => {
    const code = e.target.value;
    const name = await fetchName("documentTypes", code);
    setInvoice((prev) => ({
      ...prev,
      invoice_type: code,
      invoice_type_name: name,
    }));
  };

  // تحديث العميل بالكود
  const handleCustomerChange = async (e) => {
    const code = e.target.value;
    const name = await fetchName("customers", code);
    setInvoice((prev) => ({ ...prev, customer_id: code, customer_name: name }));
  };

  // تحديث المخزن بالكود
  const handleStoreChange = async (e) => {
    const code = e.target.value;
    const name = await fetchName("stores", code);
    setInvoice((prev) => ({ ...prev, store_id: code, store_name: name }));
  };

  // تحديث بيانات جزء
  const handleItemChange = (index, field) => async (e) => {
    const value = e.target.value;
    const newItems = [...invoice.items];
    newItems[index][field] = value;

    // عند كتابة رقم الجزء → جلب الاسم
    if (field === "part_number") {
      const name = await fetchName("parts", value);
      newItems[index].part_name = name;
    }

    setInvoice((prev) => ({ ...prev, items: newItems }));
  };

  // إضافة / حذف سطر
  const addItem = () =>
    setInvoice((prev) => ({ ...prev, items: [...prev.items, emptyItem()] }));
  const removeItem = (i) =>
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== i),
    }));

  // حفظ الفاتورة
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...invoice,
        items: invoice.items.map((it) => ({
          part_number: it.part_number,
          quantity: Number(it.quantity),
          price: Number(it.price),
        })),
      };
      if (invoiceId) await axios.put(`/api/invoices/${invoiceId}`, payload);
      else await axios.post(`/api/invoices`, payload);
      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  // فتح Dialog لإضافة نوع جديد
  const openAddDialog = (type) => {
    setDialogType(type);
    setNewRecord({ code: "", name: "" });
    setDialogOpen(true);
  };

  const saveNewRecord = async () => {
    try {
      await axios.post(`/api/${dialogType}`, newRecord);
      alert("تمت الإضافة بنجاح");
      setDialogOpen(false);
    } catch {
      alert("حدث خطأ أثناء الإضافة");
    }
  };

  return (
    <Paper sx={{ p: 2 }} dir="rtl">
      <Typography variant="h6" gutterBottom>
        {invoiceId ? "تعديل فاتورة" : "إنشاء فاتورة جديدة"}
      </Typography>

      <Grid container spacing={2}>
        {/* كود المخزن */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="رقم المخزن"
            fullWidth
            value={invoice.store_id}
            onChange={handleStoreChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ mt: 2, color: "green" }}>
            {invoice.store_name || "—"}
          </Typography>
        </Grid>
        
        {/* كود نوع الفاتورة */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="كود نوع المستند"
            fullWidth
            value={invoice.invoice_type}
            onChange={handleTypeChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ mt: 2, color: "green" }}>
            {invoice.invoice_type_name || "—"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <IconButton onClick={() => openAddDialog("documentTypes")}>
            <AddIcon />
          </IconButton>
        </Grid>

        {/* التاريخ ورقم الفاتورة */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="تاريخ"
            type="date"
            fullWidth
            value={invoice.date}
            onChange={handleChange("date")}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="رقم الفاتورة"
            fullWidth
            value={invoice.invoice_number}
            onChange={handleChange("invoice_number")}
          />
        </Grid>

        {/* كود العميل */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="رقم العميل"
            fullWidth
            value={invoice.customer_id}
            onChange={handleCustomerChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" sx={{ mt: 2, color: "green" }}>
            {invoice.customer_name || "—"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <IconButton onClick={() => openAddDialog("customers")}>
            <AddIcon />
          </IconButton>
        </Grid>

        
      </Grid>

      {/* جدول التفاصيل */}
      <Box mt={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>رقم الجزء</TableCell>
              <TableCell>اسم الجزء</TableCell>
              <TableCell>الكمية</TableCell>
              <TableCell>السعر</TableCell>
              <TableCell>الإجمالي</TableCell>
              <TableCell>حذف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.items.map((it, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <TextField
                    value={it.part_number}
                    onChange={handleItemChange(idx, "part_number")}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "green" }}>
                    {it.part_name || "—"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={it.quantity}
                    onChange={handleItemChange(idx, "quantity")}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={it.price}
                    onChange={handleItemChange(idx, "price")}
                    size="small"
                  />
                </TableCell>
                <TableCell>{calcLine(it).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => removeItem(idx)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6}>
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addItem}>
                  إضافة سطر
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">الإجمالي: {total.toFixed(2)}</Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>
            إلغاء
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            حفظ
          </Button>
        </Box>
      </Box>

      {/* Dialog لإضافة نوع جديد */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} dir="rtl">
        <DialogTitle>
          إضافة{" "}
          {dialogType === "documentTypes"
            ? "نوع مستند"
            : dialogType === "customers"
            ? "عميل"
            : dialogType === "parts"
            ? "جزء"
            : "مخزن"}{" "}
          جديد
        </DialogTitle>
        <DialogContent>
          <TextField
            label="الكود"
            fullWidth
            sx={{ mt: 1 }}
            value={newRecord.code}
            onChange={(e) =>
              setNewRecord((prev) => ({ ...prev, code: e.target.value }))
            }
          />
          <TextField
            label="الاسم"
            fullWidth
            sx={{ mt: 2 }}
            value={newRecord.name}
            onChange={(e) =>
              setNewRecord((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>إلغاء</Button>
          <Button onClick={saveNewRecord} variant="contained">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
