import {
  MessageOutlined,
  People,
  PersonOutline,
  Search,
} from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "./components";

export const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Stack
      width={"80px"}
      bgcolor={"black"}
      height={"calc(100vh - 62px)"}
      borderRadius={"16px"}
      px={2}
      py={4}
    >
      <Stack
        direction={"column"}
        mx={"auto"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <AutoAwesomeIcon sx={{ color: "primary.main", fontSize: "32px" }} />
        <Stack gap={6}>
          <IconButton aria-label="Profile">
            <NavLink to={"/chat"}>
              {({ isActive }) => (
                <MessageOutlined
                  sx={{ color: isActive ? "primary.main" : "white" }}
                />
              )}
            </NavLink>
          </IconButton>
          <IconButton aria-label="Profile">
            <NavLink to={"/explore"}>
              {({ isActive }) => (
                <Search sx={{ color: isActive ? "primary.main" : "white" }} />
              )}
            </NavLink>
          </IconButton>
          <IconButton aria-label="Profile">
            <NavLink to={"/friends"}>
              {({ isActive }) => (
                <People sx={{ color: isActive ? "primary.main" : "white" }} />
              )}
            </NavLink>
          </IconButton>
          {/* <IconButton aria-label="Profile">
            <NavLink to={"/deleted"}>
              {({ isActive }) => (
                <DeleteOutline
                  sx={{ color: isActive ? "primary.main" : "white" }}
                />
              )}
            </NavLink>
          </IconButton> */}
        </Stack>
        <IconButton aria-label="Profile" onClick={handleClick}>
          <PersonOutline sx={{ color: "white" }} />
        </IconButton>
        <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Stack>
    </Stack>
  );
};
