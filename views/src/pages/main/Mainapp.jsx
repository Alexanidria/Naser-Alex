import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Mainapp = () => {

   const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // ⚙️ هنا ضع منطق التحقق أو الاتصال بالـ API
    console.log("اسم المستخدم:", values.username);
    console.log("الرقم السري:", values.password);
  };


  return (
    <div>
<Box
      dir="rtl"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          تسجيل الدخول
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="اسم المستخدم"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={values.username}
            onChange={handleChange("username")}
          />

          <TextField
            label="الرقم السري"
            variant="outlined"
            fullWidth
            required
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth>
            دخول
          </Button>
        </form>
      </Paper>
    </Box>

    </div>
  );
};

export default Mainapp;

