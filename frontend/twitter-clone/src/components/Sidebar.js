import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };
  return (
    <div style={{ height: "100vh", background: "#333f5f" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div style={{ textAlign: "center" }}>
          <h3>{user.name} Hosgeldin</h3>
        </div>

        <Toolbar />
        <Divider />
        <List>
          {["Feed"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider />

          <ListItem key="Followings" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Followings" />
            </ListItemButton>
          </ListItem>
          {user.followings &&
            user.followings.map((following, index) => {
              if (following.name !== user.name) {
                return (
                  <h5
                    key={index}
                    style={{ textAlign: "center", margin: "0.4rem" }}
                  >
                    {following.name}
                  </h5>
                );
              }
            })}

          <Divider />

          <ListItem key="Followers" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Followers" />
            </ListItemButton>
          </ListItem>
          {user.followers &&
            user.followers.map((follower, index) => {
              if (follower.name !== user.name) {
                return (
                  <h5
                    key={index}
                    style={{ textAlign: "center", margin: "0.4rem" }}
                  >
                    {follower.name}
                  </h5>
                );
              } else {
                return null;
              }
            })}

          <Divider />

          <ListItem key="Logout" disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
              }}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
