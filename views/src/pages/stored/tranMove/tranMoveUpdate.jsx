import React, { useState, useEffect } from "react";
import {
  Box, TextField, Button, Grid, Typography, IconButton, Table,
  TableBody, TableCell, TableHead, TableRow, Paper, Dialog,
  DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const emptyItem = () => ({
  part_number: "",
  part_name: "",
  quantity: 1,
  price: 0
});

export default function InvoiceForm({ invoiceId, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    invoice_number: "",
    date: new Date().toISOString().slice(0, 10),
    customer_id: "",
    invoice_type: "",
    items: [emptyItem()]
  });
  const [errors, setErrors] = useState({});
  const [invoiceTypeName, setInvoiceTypeName] = useState("");

  const [openPartSearchDialog, setOpenPartSearchDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [partsList, setPartsList] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  // Dialogs
  const [openTypeDialog, setOpenTypeDialog] = useState(false);
  const [openPartDialog, setOpenPartDialog] = useState(false);

  const [newType, setNewType] = useState({ code: "", name: "" });
  const [newPart, setNewPart] = useState({ code: "", name: "", price: 0 });

  // === تحميل فاتورة عند التعديل ===
  useEffect(() => {
    if (invoiceId) {
      setLoading(true);
      axios.get(`/api/invoices/${invoiceId}`)
        .then(res => {
          const data = res.data;
          setInvoice({
            invoice_number: data.invoice_number,
            date: (data.date || "").slice(0, 10),
            customer_id: data.customer_id,
            invoice_type: data.invoice_type,
            items: data.items.map(it => ({
              part_number: it.part_number,
              part_name: "",
              quantity: it.quantity,
              price: it.price
            })) || [emptyItem()]
          });
          if (data.invoice_type) fetchInvoiceTypeName(data.invoice_type);
        })
        .finally(() => setLoading(false));
    }
  }, [invoiceId]);

  // === جلب اسم نوع الفاتورة ===
  const fetchInvoiceTypeName = async (code) => {
    if (!code) return setInvoiceTypeName("");
    try {
      const res = await axios.get(`/api/invoiceTypes/${code}`);
      setInvoiceTypeName(res.data.name || "");
    } catch {
      setInvoiceTypeName("");
    }
  };

  const handleInvoiceTypeChange = (e) => {
    const code = e.target.value;
    setInvoice(prev => ({ ...prev, invoice_type: code }));
    fetchInvoiceTypeName(code);
  };

  // === جلب اسم الجزء من API ===
  const fetchPartName = async (index, code) => {
    if (!code) {
      updateItem(index, { part_name: "", price: 0 });
      return;
    }
    try {
      const res = await axios.get(`/api/parts/${code}`);
      updateItem(index, {
        part_name: res.data.name || "",
        price: res.data.price || 0
      });
    } catch {
      updateItem(index, { part_name: "", price: 0 });
    }
  };

  // === تحديث صف ===
  const updateItem = (index, changes) => {
    setInvoice(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], ...changes };
      return { ...prev, items };
    });
  };

  const handleItemChange = (index, field) => async (e) => {
    const value = e.target.value;
    updateItem(index, { [field]: value });
    if (field === "part_number") fetchPartName(index, value);
  };

  const addItem = () => setInvoice(prev => ({ ...prev, items: [...prev.items, emptyItem()] }));
  const removeItem = (idx) => setInvoice(prev => {
    const items = prev.items.filter((_, i) => i !== idx);
    return { ...prev, items: items.length ? items : [emptyItem()] };
  });

  const calcLineTotal = (it) => (Number(it.quantity) || 0) * (Number(it.price) || 0);
  const total = invoice.items.reduce((s, it) => s + calcLineTotal(it), 0);

  const validate = () => {
    const e = {};
    if (!invoice.invoice_number) e.invoice_number = "رقم الفاتورة مطلوب";
    if (!invoice.customer_id) e.customer_id = "العميل مطلوب";
    if (!invoice.invoice_type) e.invoice_type = "كود نوع الفاتورة مطلوب";
    invoice.items.forEach((it, i) => {
      if (!it.part_number) e[`item_part_${i}`] = "رقم الجزء مطلوب";
      if (!it.quantity || it.quantity <= 0) e[`item_qty_${i}`] = "كمية غير صحيحة";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        invoice_number: invoice.invoice_number,
        date: invoice.date,
        customer_id: invoice.customer_id,
        invoice_type: invoice.invoice_type,
        items: invoice.items.map(it => ({
          part_number: it.part_number,
          quantity: Number(it.quantity),
          price: Number(it.price)
        }))
      };
      if (invoiceId) await axios.put(`/api/invoices/${invoiceId}`, payload);
      else await axios.post(`/api/invoices`, payload);
      if (onSaved) onSaved();
    } catch {
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  };

  // === إضافة نوع مستند جديد ===
  const handleAddType = async () => {
    if (!newType.code || !newType.name) {
      alert("أدخل الكود والاسم");
      return;
    }
    await axios.post(`/api/invoiceTypes`, newType);
    setOpenTypeDialog(false);
    setNewType({ code: "", name: "" });
    if (newType.code === invoice.invoice_type) setInvoiceTypeName(newType.name);
  };

  // === إضافة جزء جديد ===
  const handleAddPart = async () => {
    if (!newPart.code || !newPart.name) {
      alert("أدخل كود واسم الجزء");
      return;
    }
    await axios.post(`/api/parts`, newPart);
    setOpenPartDialog(false);
    setNewPart({ code: "", name: "", price: 0 });
    alert("تمت إضافة الجزء بنجاح");
  };

  const fetchPartsList = async (term = "") => {
    try {
      const res = await axios.get(`/api/parts?search=${encodeURIComponent(term)}`);
      setPartsList(res.data || []);
    } catch {
      setPartsList([]);
    }
  };

  useEffect(() => {
    if (openPartSearchDialog) fetchPartsList(searchTerm);
  }, [openPartSearchDialog]);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchPartsList(term);
  };

  const openSearchDialogForRow = (idx) => {
    setSelectedRowIndex(idx);
    setOpenPartSearchDialog(true);
  };

  const selectPart = (part) => {
    if (selectedRowIndex !== null) {
      updateItem(selectedRowIndex, {
        part_number: part.code,
        part_name: part.name,
        price: part.price
      });
    }
    setOpenPartSearchDialog(false);
  };

  return (
    <Paper sx={{ p: 2 }} dir="rtl">
      <Typography variant="h6">{invoiceId ? "تعديل فاتورة" : "إنشاء فاتورة"}</Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="تاريخ"
            type="date"
            fullWidth
            value={invoice.date}
            onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="رقم الفاتورة"
            fullWidth
            value={invoice.invoice_number}
            onChange={(e) => setInvoice({ ...invoice, invoice_number: e.target.value })}
            error={!!errors.invoice_number}
            helperText={errors.invoice_number}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="رقم العميل"
            fullWidth
            value={invoice.customer_id}
            onChange={(e) => setInvoice({ ...invoice, customer_id: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label="كود نوع الفاتورة"
            value={invoice.invoice_type}
            onChange={handleInvoiceTypeChange}
            sx={{ flex: 1 }}
          />
          <Typography sx={{ minWidth: 80, color: invoiceTypeName ? "green" : "gray" }}>
            {invoiceTypeName || "—"}
          </Typography>
          <IconButton color="primary" onClick={() => setOpenTypeDialog(true)}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* جدول الأجزاء */}
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
            {invoice.items.map((it, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TextField
                    value={it.part_number}
                    onChange={handleItemChange(idx, "part_number")}
                    size="small"
                    error={!!errors[`item_part_${idx}`]}
                    helperText={errors[`item_part_${idx}`]}
                    sx={{ width: 100 }}
                  />
                  <IconButton color="primary" onClick={() => openSearchDialogForRow(idx)}>
                    <SearchIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="primary" onClick={() => setOpenPartDialog(true)}>
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
                    onChange={handleItemChange(idx, "quantity")}
                    sx={{ width: 80 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={it.price}
                    onChange={handleItemChange(idx, "price")}
                    sx={{ width: 80 }}
                  />
                </TableCell>
                <TableCell>{calcLineTotal(it).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => removeItem(idx)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* الإجمالي */}
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">الإجمالي: {total.toFixed(2)}</Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>إلغاء</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>حفظ</Button>
        </Box>
      </Box>

      {/* Dialog نوع مستند */}
      <Dialog open={openTypeDialog} onClose={() => setOpenTypeDialog(false)} dir="rtl">
        <DialogTitle>إضافة نوع مستند جديد</DialogTitle>
        <DialogContent>
          <TextField label="الكود" fullWidth margin="dense"
            value={newType.code} onChange={(e) => setNewType({ ...newType, code: e.target.value })} />
          <TextField label="الاسم" fullWidth margin="dense"
            value={newType.name} onChange={(e) => setNewType({ ...newType, name: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTypeDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleAddType}>حفظ</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog إضافة جزء */}
      <Dialog open={openPartDialog} onClose={() => setOpenPartDialog(false)} dir="rtl">
        <DialogTitle>إضافة جزء جديد</DialogTitle>
        <DialogContent>
          <TextField label="كود الجزء" fullWidth margin="dense"
            value={newPart.code} onChange={(e) => setNewPart({ ...newPart, code: e.target.value })} />
          <TextField label="اسم الجزء" fullWidth margin="dense"
            value={newPart.name} onChange={(e) => setNewPart({ ...newPart, name: e.target.value })} />
          <TextField label="السعر" fullWidth margin="dense" type="number"
            value={newPart.price} onChange={(e) => setNewPart({ ...newPart, price: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPartDialog(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleAddPart}>حفظ</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog بحث عن جزء */}
      <Dialog
        open={openPartSearchDialog}
        onClose={() => setOpenPartSearchDialog(false)}
        fullWidth
        maxWidth="md"
        dir="rtl"
      >
        <DialogTitle>بحث عن جزء</DialogTitle>
        <DialogContent>
          <TextField
            label="بحث"
            fullWidth
            margin="dense"
            value={searchTerm}
            onChange={handleSearchChange}
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
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => selectPart(p)}
                    >
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
          <Button onClick={() => setOpenPartSearchDialog(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog إضافة جزء (كما في الكود السابق) */}
      {/* ... */}
    </Paper>
  );
}
