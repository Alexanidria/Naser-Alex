import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

// const drawerWidth = 240;
const Appbar = ({
  open,
  drawerwidth,
  collapsedWidth,
  toggleDrawer,
  mode,
  setMode,
  theme, }
) => {
  return (
    // <AppBar
    //   position="static"
    //   sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
    // >
    //   <Toolbar>
    //     <IconButton
    //       size="large"
    //       edge="start"
    //       color="inherit"
    //       aria-label="menu"
    //       sx={{ ml: 1 }}
    //     >
    //       <MenuIcon />
    //     </IconButton>
    //     <Typography
    //       variant="h5"
    //       component="div"
    //       sx={{ "&:hover": { fontSize: "30px", color: "red" } }}
    //     >
    //       اسكندرية
    //     </Typography>

    //     <Box flexGrow={1} />

    //     <Stack direction={"row"}>


    //       <IconButton color="inherit">
    //         <MenuIcon />
    //       </IconButton>
    //       <Button color="inherit">User name</Button>
    //         <IconButton color="inherit">
    //         {theme.palette.mode==="dark" ? <Brightness4Icon /> : <LightModeOutlinedIcon />}
    //       </IconButton>
    //     </Stack>
    //   </Toolbar>
    // </AppBar>
    <AppBar
      position="fixed"
      sx={{
        bgcolor: theme.palette.primary.main,
        width: { md: `calc(100% - ${open ? drawerwidth : collapsedWidth}px)`, xs: "100%" },
        mr: { md: `${open ? drawerwidth : collapsedWidth}px`, xs: 0 },
        transition: "all 0.5s ease",
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="end" onClick={toggleDrawer}
          sx={{
            transition: "transform 0.3s ease", ml: 1,
            "&:hover": { transform: " scale(1.2)" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          الإسكندرية
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="الملف الشخصي" arrow>
            <Button color="inherit">User Name</Button>
          </Tooltip>
          <Tooltip title={mode === "dark" ? "الوضع النهاري" : "الوضع الليلي"} arrow>
            <IconButton
              color="inherit"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": { transform: "rotate(20deg) scale(1.2)" },
              }}
            >
              {mode === "dark" ? <LightModeOutlinedIcon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
