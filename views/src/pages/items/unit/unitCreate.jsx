import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Box, Typography, Stack, Paper } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from "axios";

import { userId } from "../../users/login";

const UnitCreate = () => {

  const [formData, setFormData] = useState({
    id_user: userId, name: '', cod: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/items/unit", formData); // 🔹 POST to backend
      alert("تم إضافة البيانات بنجاح!");
      navigate("/store/unit"); // redirect to main page
    } catch (error) {
      console.error("Error adding record:", error);
      alert("فشل إضافة البيانات.");
    }
  };
  return (
    <>
      <Box sx={{ maxWidth: "95%", mx: "auto", direction: "rtl", }}>
        <Typography variant="h3">وحدة قياس قطع غيار</Typography>
        <Stack direction={"row"} sx={{ color: "Highlight" }}>
          <Typography variant="h4" sx={{ mt: "10px" }}>إضافة وحدة</Typography>
          <Box flexGrow={1} />
          <Button color="primary" onClick={() => navigate(`/store/unit`)}>
            <ArrowBackIcon />
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 2,
          p: 1,
          direction: "rtl",
        }}
      >

        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="cod"
                value={formData.cod}
                onChange={handleChange}
                required
                fullWidth
                label="الكود"
                helperText="من فضلك أدخل الكود (بحد اقصى رقمين)"
              />
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                label="أسم القسم"
                helperText="من فضلك أدخل اسم القسم (بحد ادنى ثلاثة احرف وحد اقصى عشرون حرف)"
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button type="submit" variant="contained" sx={{ fontSize: "18px" }}>
                  حفـــظ
                </Button>
              </Stack>

            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default UnitCreate;