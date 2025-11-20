import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import axios from "axios";

import { userId } from "../../users/login";

const CarUpdate = () => {
  const [formData, setFormData] = useState({
    id_user: userId,
    name: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // جلب البيانات الحالية من قاعدة البيانات
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/items/car/${id}`)
  //     .then((res) => setFormData(res.data[0]))
  //     .catch((err) => console.error("Error fetching record:", err));
  // }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/items/car/${id}`, formData); // 🔹 POST to backend
      alert("تم تحديث البيانات بنجاح!");
      navigate("/store/car"); // redirect to main page
    } catch (error) {
      console.error("حدث خطأ أثناء التحديث:", error);
      alert("فشل تحديث البيانات.");
    }
  };

  return (
    <>
      <Box
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
            تعديل موديل سيارة
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
                <Box flexGrow={1} />
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ fontSize: "18px" }}
                >
                  حفـــظ
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default CarUpdate;
