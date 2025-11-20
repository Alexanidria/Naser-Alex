import FormInput from "../../component/formInput";
import { itemAdd, itemAll, } from '../../urlApi'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Box, Typography, Stack, Paper } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from "axios";

import { userId } from "../../users/login";

const ItemCreate = () => {

  const [formData, setFormData] = useState({
    id_user: userId, name: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/items/car", formData); // 🔹 POST to backend
      alert("تم إضافة البيانات بنجاح!");
      navigate("/store/car"); // redirect to main page
    } catch (error) {
      console.error("Error adding record:", error);
      alert("فشل إضافة البيانات.");
    }
  };
  return (
    <>
      <FormInput
        mode="add"
        title="قطـــع الغيــار"
        subTitle="إضافة قطع غيار"
        urlApiadd={itemAdd}
        urlApiget={itemAll}
        urlRedirect="/store/item"
        fields={[
          {
            name: "num",
            type: "text",
            label: "رقم الجزء",
            helperText: "أدخل رقم الجزء (20 رقم/حرف)",
          },
          {
            name: "code_storesupler",
            type: "select",
            label: "اختر كود توريد مخزنى",
            urlget: '/items/storesupler',
            valueField: "cod",
            textField: "nam",
          },
          {
            name: "nam",
            type: "text",
            label: "اسم الجزء",
            helperText: "أدخل اسم الجزء (3-50 حرفًا)",
          },
          {
            name: "rereqost",
            type: "text",
            label: "نقطة اعادة الطلب",
            helperText: "لتحضير اعادة الطلب بشكل تلقائى",
            value: "0"
          },
          {
            name: "id_genral",
            type: "select",
            label: "ينتمى الى مجموعة",
            urlget: '/items/genral',
            valueField: "id",
            textField: "nam",
          },
          {
            name: "id_unit",
            type: "select",
            label: "وحدة القياس المستخدمة ",
            urlget: '/items/unit',
            valueField: "id",
            textField: "nam",
          },
          {
            name: "id_car",
            type: "select",
            label: "موديل السيارة",
            urlget: '/items/car',
            valueField: "id",
            textField: "nam",
          },
        ]}
      />

      {/* <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 5,
          p: 3,
          direction: "rtl",
        }}
      >
        <Typography variant="h3">طرازات السيارات</Typography>
        <Stack direction={"row"} sx={{ color: "Highlight" }}>
          <Typography variant="h4" sx={{ mt: "10px" }}>
            إضافة موديل سيارة
          </Typography>
          <Box flexGrow={1} />
          <Button color="primary" onClick={() => navigate(`/store/car`)}>
            <ArrowBackIcon />
          </Button>
        </Stack>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                label="موديل السيارة"
                helperText="من فضلك أدخل اسم موديل السيارة"
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button type="submit" variant="contained" sx={{ fontSize: "18px" }}>
                  حفـــظ
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box> */}
    </>
  );
}

export default ItemCreate;