import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu as MuiMenu,
} from "@mui/material";
import React from "react";
import { useAuth } from "../../../../Auth";
import { useLogoutUser } from "../../../../services";
import { useSocket } from "../../../../socket/useSocket";
import { removeCookie } from "../../../../utils";

export const Menu = ({ anchorEl, setAnchorEl }: any) => {
  const { user, setIsAuthenticated } = useAuth();
  const socket = useSocket();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: logoutMutate } = useLogoutUser({
    onSuccess: () => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      setIsAuthenticated(false);
      socket.close();
    },
  });

  const handleLogout = async () => {
    await logoutMutate({});
  };

  return (
    <React.Fragment>
      <MuiMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 200,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {user.fullName}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MuiMenu>
    </React.Fragment>
  );
};
