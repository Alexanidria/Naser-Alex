import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export default function AddPartDialog({ open, onClose, part, setPart, onSave }) {
  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>إضافة جزء جديد</DialogTitle>
      <DialogContent>
        <TextField label="كود الجزء" fullWidth margin="dense"
          value={part.code} onChange={(e) => setPart({ ...part, code: e.target.value })}/>
        <TextField label="اسم الجزء" fullWidth margin="dense"
          value={part.name} onChange={(e) => setPart({ ...part, name: e.target.value })}/>
        <TextField label="السعر" fullWidth margin="dense" type="number"
          value={part.price} onChange={(e) => setPart({ ...part, price: e.target.value })}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button variant="contained" onClick={onSave}>حفظ</Button>
      </DialogActions>
    </Dialog>
  );
}


// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { TextField, Button, Box, Typography, Stack, Paper, InputLabel, Select, MenuItem, FormControl, CircularProgress, } from "@mui/material";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import axios from "axios";

// import { userId } from "../users/login";


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

// function FormInAddEdit({
//   mode = "add",
//   urlApi,
//   urlRedirect ,
//   title = "نموذج ديناميكي",
//   subTitle = "نموذج ديناميكي",
//   fields = [],
// }) {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(mode !== "add");
//   const [selectOptions, setSelectOptions] = useState({}); // { fieldName: [options] }

//   // ✅ Focus the first field (Select) when component mounts
//   const selectRef = useRef(null);
//   useEffect(() => {
//     if (selectRef.current) {
//       // A small delay ensures it's focusable after rendering
//       setTimeout(() => {
//         const selectButton = selectRef.current.querySelector('input, .MuiSelect-select');
//         if (selectButton) selectButton.focus();
//       }, 300);
//     }
//   }, [selectOptions]); // Wait until generals are loaded

//   // ✅ Fetch data for dropdown
//   // ✅ تحميل خيارات الـ Select لكل حقل فيه endpoint
//   useEffect(() => {
//     fields.forEach((f) => {
//       const url=`http://localhost:5000/${f.endpoint}`
//       if (f.type === "select" && url) {
//         axios
//           .get(url)
//           .then((res) => {
//             setSelectOptions((prev) => ({ ...prev, [f.name]: res.data }));
//           })
//           .catch((err) => console.error(`Error loading options for ${f.name}:`, err));
//       }
//     });
//   }, [fields]);

//   // ✅ Fetch data for update || View
//   useEffect(() => {
//     if ((mode === "edit" || mode === "view") && id) {
//       axios
//         .get(`${urlApi}/${id}`)
//         .then((res) => setFormData(res.data))
//         .catch((err) => console.error("Error loading record:", err))
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [id, mode, urlApi]);

//   // ✅ عند تغيير أي حقل
//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle form submit [ save || update ]
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = { ...formData, id_user: userId, };

//     try {
//       if (mode === "edit" && id) {
//         await axios.put(`http://localhost:5000/${urlApi}/${id}`, payload);
//         alert("تم التحديث بنجاح!");
//       } else {
//         await axios.post(`http://localhost:5000/${urlApi}`, payload);
//         alert("تمت الإضافة بنجاح!");
//       }
//       navigate(urlRedirect);
//     } catch (error) {
//       console.error("Error saving record:", error);
//       alert("فشل في حفظ البيانات.");
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//         <Typography sx={{ mt: 2 }}>جارٍ تحميل البيانات...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Paper sx={{ direction: "rtl", backgroundColor: "#f8f9fa" }}>

//       {/* Header */}
//       <Typography variant="h3">{title}</Typography>
//       <Stack direction={"row"} sx={{ color: "Highlight" }}>
//         <Typography variant="h4" sx={{ mt: "10px" }}>{subTitle}</Typography>
//         <Box flexGrow={1} />
//         <Button color="primary" onClick={() => navigate(urlRedirect)}>
//           <ArrowBackIcon />
//         </Button>
//       </Stack>

//       {/* form */}
//      <Box sx={{ maxWidth: 500, mx: "auto" , p: 3,}}>
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2, textAlign: "right" }}>
//           <form onSubmit={handleSubmit}>
//             {fields.map((field) => {
//               if (field.type === "select") {
//                 const options = selectOptions[field.name] || [];
//                 return (
//                   <FormControl key={field.name} fullWidth sx={{ mb: 2 }} ref={selectRef}>
//                     <InputLabel>{field.label}</InputLabel>
//                     <Select
//                       value={formData[field.name] || ""}
//                       label={field.label}
//                       onChange={(e) => handleChange(field.name, e.target.value)}
//                       disabled={mode === "view"}
//                     >
//                       {options.map((opt) => (
//                         <MenuItem
//                           key={opt[field.valueField]}
//                           value={opt[field.valueField]}
//                         >
//                           {opt[field.textField]}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 );
//               }

//               // النوع العادي (نص)
//               return (
//                 <TextField
//                   key={field.name}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                   label={field.label}
//                   value={formData[field.name] || ""}
//                   onChange={(e) => handleChange(field.name, e.target.value)}
//                   helperText={field.helperText}
//                   disabled={mode === "view"}
//                 />
//               );
//             })}

//             {mode !== "view" && (
//               <Stack direction="row" spacing={2} justifyContent="flex-end">
//                 <Button type="submit" variant="contained" sx={{ fontSize: "18px" }}>
//                   {mode === "edit" ? "تحديث" : "حفـــظ"}
//                 </Button>
//               </Stack>
//             )}
//           </form>
//         </Paper>
//       </Box>
//     </Paper>
//   );
// };
