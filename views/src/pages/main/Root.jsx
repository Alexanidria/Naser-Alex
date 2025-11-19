import React, { useState, useMemo, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Toolbar,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { items, store,user } from "./menu";
import { getAppTheme } from "./them";

import Appbar from "./Appbar";
import Slidbar from "./Slidbar";


const drawerWidth = 240;
const collapsedWidth = 70; // عرض القائمة عند التصغير في الشاشات الكبيرة

export default function Root() {

  const [open, setOpen] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState("light");

  // تحميل الوضع من localStorage عند أول تشغيل
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (savedMode) setMode(savedMode);
  }, []);

  // حفظ الوضع في localStorage عند تغييره
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box dir="rtl" sx={{
        display: "flex", minHeight: "100vh", bgcolor: "#f7f7f7",
      }}>
        <CssBaseline />

        {/* الشريط العلوي */}
        <Appbar
          drawerwidth={drawerWidth}
          mode={mode}
          setMode={setMode}
          toggleDrawer={toggleDrawer}
          collapsedWidth={collapsedWidth}
          theme={theme}
          open={open}
        />
 {/* القائمة الجانبية في الشاشات الكبيرة */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="right"
          open={open}
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : collapsedWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
              transition: "width 0.5s ease",
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {items.map((item) => (
              <Tooltip
                key={item.key}
                title={!hovered ? item.titel : ""}
                placement="left"
                arrow
              >
                <ListItem key={item.key} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.link)}
                    sx={{
                      bgcolor:
                        location.pathname === item.link
                          ? theme.palette.mode === "dark"
                            ? grey[800]
                            : grey[300]
                          : "transparent",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.titel} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </List>
          <Divider />
          <List>
            {store.map((item) => (
              <Tooltip
                key={item.key}
                title={!hovered ? item.titel : ""}
                placement="left"
                arrow
              >
                <ListItem key={item.key} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.link)}
                    sx={{
                      bgcolor:
                        location.pathname === item.link
                          ? theme.palette.mode === "dark"
                            ? grey[800]
                            : grey[300]
                          : "transparent",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.titel} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </List>
           <Divider />
          <List>
            {user.map((item) => (
              <Tooltip
                key={item.key}
                title={!hovered ? item.titel : ""}
                placement="left"
                arrow
              >
                <ListItem key={item.key} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.link)}
                    sx={{
                      bgcolor:
                        location.pathname === item.link
                          ? theme.palette.mode === "dark"
                            ? grey[800]
                            : grey[300]
                          : "transparent",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.titel} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Drawer>
      )}

      {/* القائمة الجانبية للموبايل */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {items.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.link);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.titel} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {store.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.link);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.titel} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
            <Divider />
          <List>
            {user.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.link);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.titel} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
        {/* <Slidbar
          open={open}
          drawerwidth={drawerWidth}
          collapsedWidth={collapsedWidth}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          toggleDrawer={toggleDrawer}
          setMobileOpen={setMobileOpen}
          theme={theme}
        /> */}

        {/* محتوى الصفحة */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 9,
            transition: "margin 0.5s ease",
            mx: 2,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            boxShadow: 2,
            textAlign: "right",
            color: theme.palette.text.primary,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// export default function Root() {
// const [open, setOpen] = useState(true);
//   const [hovered, setHovered] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mode, setMode] = useState("light");

//   // تحميل الوضع من localStorage
//   useEffect(() => {
//     const savedMode = localStorage.getItem("themeMode");
//     if (savedMode) setMode(savedMode);
//   }, []);

//   // حفظ الوضع عند تغييره
//   useEffect(() => {
//     localStorage.setItem("themeMode", mode);
//   }, [mode]);

//   const theme = useMemo(() => getAppTheme(mode), [mode]); // ✅ تم نقل الكود

//   const navigate = useNavigate();
//   const location = useLocation();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const toggleDrawer = () => {
//     if (isMobile) {
//       setMobileOpen(!mobileOpen);
//     } else {
//       setOpen(!open);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box dir="rtl" sx={{ display: "flex", minHeight: "100vh", bgcolor: theme.palette.background.default }}>
//         <CssBaseline />

//         {/* AppBar */}
//         <AppBar
//           position="fixed"
//           sx={{
//             bgcolor: theme.palette.primary.main,
//             width: { md: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`, xs: "100%" },
//             mr: { md: `${open ? drawerWidth : collapsedWidth}px`, xs: 0 },
//             transition: "all 0.5s ease",
//           }}
//         >
//           <Toolbar>
//             <IconButton color="inherit" edge="end" onClick={toggleDrawer}
//               sx={{
//                 transition: "transform 0.3s ease", ml: 1,
//                 "&:hover": { transform: " scale(1.2)" },
//               }}
//             >
//               <MenuIcon />
//             </IconButton>

//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               الإسكندرية
//             </Typography>

//             <Stack direction="row" spacing={1} alignItems="center">
//               <Tooltip title="الملف الشخصي" arrow>
//                 <Button color="inherit">User Name</Button>
//               </Tooltip>
//               <Tooltip title={mode === "dark" ? "الوضع النهاري" : "الوضع الليلي"} arrow>
//                 <IconButton
//                   color="inherit"
//                   onClick={() => setMode(mode === "light" ? "dark" : "light")}
//                   sx={{
//                     transition: "transform 0.3s ease",
//                     "&:hover": { transform: "rotate(20deg) scale(1.2)" },
//                   }}
//                 >
//                   {mode === "dark" ? <LightModeOutlinedIcon /> : <Brightness4Icon />}
//                 </IconButton>
//               </Tooltip>
//             </Stack>
//           </Toolbar>
//         </AppBar>

//         {/* باقي الكود كما هو ... */}
//         <Drawer
//           variant="permanent"
//           anchor="right"
//           open={open}
//           sx={{
//             width: open ? drawerWidth : collapsedWidth,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": {
//               width: open ? drawerWidth : collapsedWidth,
//               boxSizing: "border-box",
//               overflowX: "hidden",
//               transition: "width 0.5s ease",
//               bgcolor: theme.palette.background.paper,
//             },
//           }}
//         >
//           <Toolbar />
//           <Divider />
//           <List>
//             {items.map((item) => (
//               <Tooltip key={item.key} title={!hovered ? item.titel : ""} placement="left" arrow>
//                 <ListItem disablePadding>
//                   <ListItemButton
//                     onClick={() => navigate(item.link)}
//                     sx={{
//                       bgcolor:
//                         location.pathname === item.link
//                           ? theme.palette.mode === "dark"
//                             ? grey[800]
//                             : grey[300]
//                           : "transparent",
//                       transition: "transform 0.3s ease",
//                       "&:hover": { transform: "scale(1.1)" },
//                     }}
//                   >
//                     <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
//                     {open && <ListItemText primary={item.titel} />}
//                   </ListItemButton>
//                 </ListItem>
//               </Tooltip>
//             ))}
//           </List>
//         </Drawer>

//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             mt: 9,
//             transition: "margin 0.5s ease",
//             mx: 2,
//             borderRadius: 2,
//             bgcolor: theme.palette.background.paper,
//             boxShadow: 2,
//             textAlign: "right",
//             color: theme.palette.text.primary,
//           }}
//         >
//           <Outlet />
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }