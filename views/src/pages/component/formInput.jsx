import React, { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";

import {
  TextField, Button, Box, Typography, Stack, Paper, IconButton,
  InputLabel, Select, MenuItem, FormControl, CircularProgress,
  FormControlLabel, Checkbox, Switch, Grid
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

import { userId } from "../users/login";


/**
 * 🧩 مكوّن نموذج ديناميكي قابل لإعادة الاستخدام (Add/Edit/View)
 *
 * Props:
 * - mode: "add" | "edit" | "view"
 * - apiUrl: عنوان الـ API الأساسي
 * - redirectUrl: المسار الذي يتم العودة إليه بعد الحفظ
 * - title: عنوان الصفحة
 * - subTitel: عنوان فرعى
 * - fields: مصفوفة الحقول [{ name, type, label, helperText, endpoint?, valueField?, textField? }]
 *   type: "text" | "select"
 */

function FormInput({
  mode = "add",
  title = "",
  subTitle = "",
  urlApiget,
  urlApiadd,
  urlApiupdate,
  urlRedirect,
  fields = [],
}) {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(mode !== "add");
  const [selectOptions, setSelectOptions] = useState({}); // { fieldName: [options] }

  // ✅ دالة لتنسيق التاريخ (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ✅ Fetch data for dropdown
  // ✅ تحميل خيارات الـ Select لكل حقل فيه endpoint
  useEffect(() => {
    fields.forEach((f) => {
      if (f.type === "select" && f.urlget) {
        axios
          .get(f.urlget)
          .then((res) => {
            setSelectOptions((prev) => ({ ...prev, [f.name]: res.data }));
          })
          .catch((err) => console.error(`Error loading options for ${f.name}:`, err));
      }
    });
  }, [fields]);

  // ✅ Fetch data for update || View
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      urlApiget(id)
        .then((res) => setFormData(res.data[0]))
        .catch((err) => console.error("Error loading record:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, mode, urlApiget]);

  // ✅ Focus the first field (Select) when component mounts
  const selectRef = useRef(null);
  useEffect(() => {
    // ننتظر حتى يتم عرض كل العناصر
    setTimeout(() => {
      const firstInput = document.querySelector(
        "input:not([type=hidden]), .MuiSelect-select"
      );
      if (firstInput) {
        firstInput.focus();
        if (firstInput.select) firstInput.select(); // يحدد النص لو كان TextField
      }
    }, 400);
  }, [fields, loading]); // Wait until generals are loaded

  // ✅ عند تغيير أي حقل
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // ✅ Handle form submit [ save || update ]
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, id_user: userId, };

    try {
      if (mode === "edit" && id) {
        await urlApiupdate(id, payload)
        alert("تم التحديث بنجاح!");
      } else {
        await urlApiadd(payload);
        alert("تمت الإضافة بنجاح!");
      }
      navigate(urlRedirect);
    } catch (error) {
      console.error("Error saving record:", error);
      alert("فشل في حفظ البيانات.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>جارٍ تحميل البيانات...</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ direction: "rtl", backgroundColor: "#f8f9fa" }}>

      {/* Header */}
      <Typography variant="h3">{title}</Typography>

      {subTitle && (
        <Stack direction={"row"} sx={{ color: "Highlight" }}>
          <Typography variant="h4" sx={{ mt: "10px", mx: 2 }}>{subTitle}</Typography>
          <Box flexGrow={1} />
          <Button color="primary" onClick={() => navigate(urlRedirect)}>
            <ArrowBackIcon />
          </Button>
        </Stack>
      )}

      {/* form */}
      <Box sx={{ maxWidth: 500, mx: "auto", p: 3, }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, textAlign: "right" }}>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => {
              const value = formData[field.name] || "";

              switch (field.type) {
                case "select": {
                  const options = selectOptions[field.name] || [];
                  return (
                    <FormControl key={field.name} fullWidth sx={{ mb: 2 }} >
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        value={value}
                        label={field.label}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        disabled={mode === "view"}
                      >
                        {options.map((opt) => (
                          <MenuItem
                            key={opt[field.valueField]}
                            value={opt[field.valueField]}
                          >
                            {opt[field.textField]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }

                  {/* Number */ }
                case "number":
                  return (
                    <TextField
                      key={field.name}
                      fullWidth
                      sx={{ mb: 2 }}
                      type="number"
                      label={field.label}
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      helperText={field.helperText}
                      disabled={mode === "view"}
                    />
                  )

                  {/* Date */ }
                case "date":
                  return (
                    <TextField
                      key={field.name}
                      fullWidth
                      sx={{ mb: 2 }}
                      type="date"
                      label={field.label}
                      value={
                        mode === "view"
                          ? formatDate(value)
                          : value
                            ? value.slice(0, 10)
                            : ""
                      }
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      helperText={field.helperText}
                      disabled={mode === "view"}
                    />
                  )

                  {/* checkbox */ }
                case "checkbox":
                  return (
                    <FormControlLabel
                      key={field.name}
                      sx={{ mb: 2 }}
                      control={<Checkbox
                        checked={!!value}
                        onChange={(e) => handleChange(field.name, e.target.checked)}
                        disabled={mode === "view"}
                      />
                      }
                      label={field.label}
                    />
                  );

                  {/* switch */ }
                case "switch":
                  return (
                    <FormControlLabel key={field.name} sx={{ mb: 2 }}
                      control={<Switch
                        checked={!!value}
                        onChange={(e) => handleChange(field.name, e.target.checked)}
                        disabled={mode === "view"}
                      />
                      }
                      label={field.label}
                    />
                  );

                  {/* Text */ }
                default:
                  return (
                    <TextField
                      key={field.name}
                      fullWidth
                      sx={{ mb: 2 }}
                      label={field.label}
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      helperText={field.helperText}
                      disabled={mode === "view"}
                    />
                  );
              }
            })}

            {mode !== "view" && (
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button type="submit" variant="contained" sx={{ fontSize: "18px" }}>
                  {mode === "edit" ? "تحديث" : "حفـــظ"}
                </Button>
              </Stack>
            )}
          </form>
        </Paper>
      </Box>
    </Paper>
  );
};

export default FormInput;