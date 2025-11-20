import React, { useState } from "react";
import { Box, Button, Typography, Paper, Divider } from "@mui/material";
import InvoiceHeader from "../../component/invoiceHeader";
// import InvoiceItemsTable from "./InvoiceItemsTable";
import FormInputTable from "../../component/formInputTable";
import FormInputDialog from "../../component/formInputDialog";
import FormDialogSearch from "../../component/formSerachDilog";

import FormInput from "../../component/formInput";

import {
  fetchInvoiceType,
  fetchPartByCode,
  searchParts,
  addPart,
  addInvoiceType,
  saveInvoice,
} from "../../urlApi";

export default function InvoiceForm() {
  // ✅ بيانات الفاتورة الأساسية
  const [invoice, setInvoice] = useState({
    date: "",
    invoice_number: "",
    customer_id: "",
    invoice_type: "",
    items: [],
  });

  // ✅ حالة الواجهة
  const [invoiceTypeName, setInvoiceTypeName] = useState("");
  const [errors, setErrors] = useState({});
  const [openAddPart, setOpenAddPart] = useState(false);
  const [openSearchPart, setOpenSearchPart] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newPart, setNewPart] = useState({ code: "", name: "", price: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [partsList, setPartsList] = useState([]);

  // ✅ حساب الإجمالي
  const calcLineTotal = (item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.price) || 0;
    return qty * price;
  };
  const total = invoice.items.reduce((sum, it) => sum + calcLineTotal(it), 0);

  // ✅ إضافة سطر جديد
  const handleAddItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { part_number: "", part_name: "", quantity: 1, price: 0 },
      ],
    }));
  };

  // ✅ تعديل سطر
  const handleChangeItem = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice((prev) => ({ ...prev, items: newItems }));

    // عند كتابة كود جزء
    if (field === "part_number" && value.trim() !== "") {
      fetchPartByCode(value)
        .then((res) => {
          const { name, price } = res.data;
          newItems[index].part_name = name;
          newItems[index].price = price;
          setInvoice((prev) => ({ ...prev, items: newItems }));
        })
        .catch(() => {
          newItems[index].part_name = "";
          setInvoice((prev) => ({ ...prev, items: newItems }));
        });
    }
  };

  // ✅ حذف سطر
  const handleRemoveItem = (index) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // ✅ عند كتابة كود نوع الفاتورة
  const handleInvoiceTypeChange = (e) => {
    const code = e.target.value;
    setInvoice((prev) => ({ ...prev, invoice_type: code }));
    if (code.trim() === "") return setInvoiceTypeName("");
    fetchInvoiceType(code)
      .then((res) => setInvoiceTypeName(res.data.name))
      .catch(() => setInvoiceTypeName(""));
  };

  // ✅ فتح نافذة إضافة نوع مستند
  const handleAddType = async () => {
    const name = prompt("أدخل اسم نوع الفاتورة الجديد:");
    if (!name) return;
    try {
      const res = await addInvoiceType({ name });
      alert("تمت إضافة نوع المستند بنجاح!");
      setInvoice((prev) => ({ ...prev, invoice_type: res.data.code }));
      setInvoiceTypeName(res.data.name);
    } catch {
      alert("حدث خطأ أثناء إضافة النوع!");
    }
  };

  // ✅ فتح نافذة إضافة جزء جديد
  const handleAddPartDialog = (index) => {
    setSelectedItemIndex(index);
    setNewPart({ code: "", name: "", price: "" });
    setOpenAddPart(true);
  };

  const handleSavePart = async () => {
    try {
      const res = await addPart(newPart);
      alert("تمت إضافة الجزء بنجاح!");
      if (selectedItemIndex !== null) {
        const items = [...invoice.items];
        items[selectedItemIndex] = {
          ...items[selectedItemIndex],
          part_number: res.data.code,
          part_name: res.data.name,
          price: res.data.price,
        };
        setInvoice({ ...invoice, items });
      }
      setOpenAddPart(false);
    } catch {
      alert("حدث خطأ أثناء الحفظ!");
    }
  };

  // ✅ البحث في سجل الأجزاء
  const handleSearchPart = async (index) => {
    setSelectedItemIndex(index);
    setOpenSearchPart(true);
    setPartsList([]);
  };

  const handleSearchChange = async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") return;
    const res = await searchParts(term);
    setPartsList(res.data);
  };

  const handleSelectPart = (part) => {
    const newItems = [...invoice.items];
    newItems[selectedItemIndex] = {
      ...newItems[selectedItemIndex],
      part_number: part.code,
      part_name: part.name,
      price: part.price,
    };
    setInvoice((prev) => ({ ...prev, items: newItems }));
    setOpenSearchPart(false);
  };

  // ✅ حفظ الفاتورة
  const handleSaveInvoice = async () => {
    if (!invoice.invoice_number) {
      setErrors({ invoice_number: "رقم الفاتورة مطلوب" });
      return;
    }
    try {
      await saveInvoice(invoice);
      alert("تم حفظ الفاتورة بنجاح!");
    } catch {
      alert("حدث خطأ أثناء حفظ الفاتورة!");
    }
  };

  return (
    <Paper sx={{ p: 3 }} dir="rtl">
      <Typography variant="h5" gutterBottom>
        شاشة إدخال الفاتورة
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <InvoiceHeader
        mode="add"
        data={invoice}
        setData={setInvoice}
        errors={errors}
        fields={[
          { name: "date", label: "تاريخ", type: "date" },
          { name: "invoice_number", label: "رقم الفاتورة", type: "text" },
          { name: "customer_id", label: "رقم العميل", type: "text" },
          {
            name: "invoice_type",
            label: "كود نوع الفاتورة",
            type: "text",
            extra: "type",
          },
          {
            name: "dd",
            label: "كتورة",
            type: "text",
            extra: "type",
          },
        ]}
        extraValues={{ invoiceTypeName }}
        onExtraAction={() => handleAddType()}
      />

      <Divider sx={{ my: 2 }} />

      <FormInputTable
        items={invoice.items}
        errors={errors}
        onChangeItem={handleChangeItem}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onAddPart={handleAddPartDialog}
        onSearchPart={handleSearchPart}
        calcLineTotal={calcLineTotal}
        total={total}
      />

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" color="primary" onClick={handleSaveInvoice}>
          حفظ الفاتورة
        </Button>
      </Box>

      {/* ✅ نافذة إضافة جزء */}
      <FormInputDialog
        open={openAddPart}
        onClose={() => setOpenAddPart(false)}
        part={newPart}
        setPart={setNewPart}
        onSave={handleSavePart}
      />

      {/* ✅ نافذة البحث عن جزء */}
      <FormDialogSearch
        open={openSearchPart}
        onClose={() => setOpenSearchPart(false)}
        searchTerm={searchTerm}
        onSearch={handleSearchChange}
        partsList={partsList}
        onSelect={handleSelectPart}
      />
    </Paper>
  );
}
