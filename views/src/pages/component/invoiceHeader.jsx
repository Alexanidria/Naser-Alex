import React from "react";
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function DynamicFormHeader({
  mode = "add",
  data = {},
  setData = () => {},
  fields = [],
  errors = {},
  onExtraAction = () => {}, // مثل زر إضافة نوع جديد
  extraValues = {}, // مثل { invoiceTypeName: "فاتورة مبيعات" }
}) {
  const isViewMode = mode === "view";

  const handleChange = (name, value) => {
    if (!isViewMode) setData({ ...data, [name]: value });
  };

  const renderField = (field) => {
    const { name, label, type = "text", helperText, options = [], extra } = field;
    const value = data[name] || "";

    // نوع خاص: حقل كود نوع الفاتورة مع الاسم وزر الإضافة
    if (extra === "type") {
      return (
        <Grid
          key={name}
          item
          xs={12}
          sm={3}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <TextField
            label={label}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            sx={{ flex: 1 }}
            disabled={isViewMode}
          />
          <Typography
            sx={{
              minWidth: 80,
              color: extraValues?.invoiceTypeName ? "success.main" : "text.secondary",
              fontWeight: "bold",
            }}
          >
            {extraValues?.invoiceTypeName || "—"}
          </Typography>
          {!isViewMode && (
            <IconButton color="primary" onClick={() => onExtraAction(name)}>
              <AddIcon />
            </IconButton>
          )}
        </Grid>
      );
    }

    // نوع select (قائمة)
    if (type === "select") {
      return (
        <Grid key={name} item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label={label}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            helperText={helperText}
            disabled={isViewMode}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      );
    }

    // النوع الافتراضي: text / date / number
    return (
      <Grid key={name} item xs={12} sm={3}>
        <TextField
          fullWidth
          label={label}
          type={type}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          helperText={errors[name] || helperText}
          error={!!errors[name]}
          InputLabelProps={type === "date" ? { shrink: true } : {}}
          disabled={isViewMode}
        />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {fields.map((field) => renderField(field))}
    </Grid>
  );
}
