import { createTheme } from "@mui/material";

export const getAppTheme = (mode) => {
  const isLight = mode === "light";

  return createTheme({
    direction: "rtl",
    palette: {
      mode,
      ...(isLight
        ? {
            primary: {
              main: "#1976d2", // أزرق هادئ
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#9c27b0", // بنفسجي خفيف
            },
            success: {
              main: "#2e7d32", // أخضر طبيعي
            },
            error: {
              main: "#d32f2f", // أحمر واضح
            },
            warning: {
              main: "#ed6c02",
            },
            info: {
              main: "#0288d1",
            },
            background: {
              default: "#f7f7f7",
              paper: "#ffffff",
            },
            text: {
              primary: "#000000",
              secondary: "#555555",
            },
          }
        : {
            primary: {
              main: "#90caf9", // أزرق فاتح للوضع الليلي
              contrastText: "#000000",
            },
            secondary: {
              main: "#ce93d8", // بنفسجي فاتح
            },
            success: {
              main: "#81c784", // أخضر مائل للنعومة
            },
            error: {
              main: "#ef9a9a", // أحمر هادئ
            },
            warning: {
              main: "#ffb74d",
            },
            info: {
              main: "#64b5f6",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#cccccc",
            },
          }),
    },
    typography: {
      fontFamily: "Cairo, sans-serif",
      button: {
        textTransform: "none", // لإلغاء الحروف الكبيرة في الأزرار
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "6px 16px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isLight
              ? "0 2px 6px rgba(0,0,0,0.1)"
              : "0 2px 8px rgba(0,0,0,0.4)",
          },
        },
      },
    },
  });
};
