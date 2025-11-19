import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Toolbar,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // useTheme,
  Tooltip,
} from "@mui/material";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import { grey } from "@mui/material/colors";
import { items, store } from "./menu";

// const drawerWidth = 240;
const Slidbar = ({
  open,
  drawerWidth,
  collapsedWidth,
  isMobile,
  mobileOpen,
  toggleDrawer,
  setMobileOpen,
  theme,
}) => {

  let location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  return (
    // <Drawer
    //   sx={{
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     "& .MuiDrawer-paper": {
    //       width: drawerWidth,
    //       boxSizing: "border-box",
    //     },
    //   }}
    //   variant="permanent"
    //   anchor="right"
    // >
    //   <Toolbar />
    //   <Divider />
    //   <List>
    //     {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
    //       <ListItem key={text} disablePadding>
    //         <ListItemButton
    //           onClick={() => {
    //             navigate("/");
    //           }}
    //         >
    //           <ListItemIcon>
    //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //           </ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItemButton>
    //       </ListItem>
    //     ))}
    //   </List>

    //   {/*  Items */}
    //   <Divider />
    //   <List>
    //     {items.map((text, index) => (
    //       <ListItem key={text.key} disablePadding>
    //         <ListItemButton
    //           onClick={() => {
    //             navigate(text.link);
    //           }}
    //           sx={{
    //             bgcolor:
    //               location.pathname === text.link
    //                 ? theme.palette.mode === "dark"
    //                   ? grey[800]
    //                   : grey[300]
    //                 : null,
    //           }}
    //         >
    //           <ListItemIcon>{text.icon}</ListItemIcon>
    //           <ListItemText primary={text.titel} />
    //         </ListItemButton>
    //       </ListItem>
    //     ))}
    //   </List>
    //    <Divider />
    //   <List>
    //     {store.map((text, index) => (
    //       <ListItem key={text.key} disablePadding>
    //         <ListItemButton
    //           onClick={() => {
    //             navigate(text.link);
    //           }}
    //           sx={{
    //             bgcolor:
    //               location.pathname === text.link
    //                 ? theme.palette.mode === "dark"
    //                   ? grey[800]
    //                   : grey[300]
    //                 : null,
    //           }}
    //         >
    //           <ListItemIcon>{text.icon}</ListItemIcon>
    //           <ListItemText primary={text.titel} />
    //         </ListItemButton>
    //       </ListItem>
    //     ))}
    //   </List>
    // </Drawer>
    <>
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
        </Drawer>
      )}
    </>
  );
};

export default Slidbar;
