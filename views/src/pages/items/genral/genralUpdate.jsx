import FormInput from "../../component/formInput"
import {  genralOne, genralUpdate } from "../../urlApi"

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

const GenralUpdate = () => {
  const [formData, setFormData] = useState({
    id_user: userId,
    name: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // جلب البيانات الحالية من قاعدة البيانات
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/items/genral/${id}`)
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
      await axios.put(`http://localhost:5000/items/genral/${id}`, formData); // 🔹 POST to backend
      alert("تم تحديث البيانات بنجاح!");
      navigate("/store/genral"); // redirect to main page
    } catch (error) {
      console.error("حدث خطأ أثناء التحديث:", error);
      alert("فشل تحديث البيانات.");
    }
  };

  return (
    < >
      {/* <Typography variant="h3">أقسام قطع غيار السيارات</Typography>
      <Stack direction={"row"} sx={{ color: "Highlight" }}>
        <Typography variant="h4" sx={{ mt: "10px" }}>تعديل قسم</Typography>
        <Box flexGrow={1} />
        <Button color="primary" onClick={() => navigate(`/store/genral`)}>
          <ArrowBackIcon />
        </Button>
      </Stack>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 3,
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
      </Box> */}
        <FormInput
        mode="edit"
        title="أقسام قطع غيار السيارات"
        subTitle="تعديل قسم"
        urlApiget={genralOne}
        urlApiupdate={genralUpdate}
        urlRedirect='/store/genral'
        fields={[
          {
            name: "cod",
            type: "text",
            label: "الكود",
            helperText: "من فضلك أدخل الكود (بحد اقصى رقمين)"
          },
          {
            name: "nam",
            type: "text",
            label: "أسم القسم",
            helperText: "من فضلك أدخل اسم القسم (بحد ادنى ثلاثة احرف وحد اقصى عشرون حرف)"

          },
        ]}

      />
    </>
  );
};

export default GenralUpdate;
