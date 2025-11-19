import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * 🧩 مكوّن نموذج ديناميكي قابل لإعادة الاستخدام 
 *
 * Props:
 * - urlApi: عنوان الـ API الأساسي
 * - urlRedirect: المسار الذي يتم العودة إليه بعد الحفظ
 * - title: عنوان الصفحة
 * - subTitel: عنوان فرعى
 * - fields: مصفوفة الحقول [{ label, key }]
 */
  
function FormInfo({ 
  urlApi, urlRedirect, title, subTitle,fields }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/${urlApi}/${id}`)
      .then((res) => setRecord(res.data[0]))
      .catch((err) => console.error("Error fetching record:", err));
  }, [id]);

  if (!record) return <Typography align="center">Loading...</Typography>;

  return (
    <Box sx={{ direction: "rtl", backgroundColor: "#f8f9fa", }}>
    
      {/* Header */}
      <Typography variant="h3">{title}</Typography>
    
    { subTitle && (
     <Stack direction={"row"} sx={{ color: "Highlight" }}>
        <Typography variant="h4" sx={{ mt: "10px" }}>{subTitle}</Typography>
        <Box flexGrow={1} />
        <Button color="primary" onClick={() => navigate(urlRedirect)}>
          <ArrowBackIcon />
        </Button>
      </Stack>
    )}
      
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 3,
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
           <Stack spacing={2}>
            {fields.map((field) => (
              <Typography key={field.key}>
                <strong>{field.label}:</strong> {record[field.key]}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row" spacing={3} mt={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`${urlRedirect}/update/${record.id}`)}
            >
              تعديل
            </Button>

          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default FormInfo;
