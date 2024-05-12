import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";

export const Layout = () => {
  return (
    <Box padding={4} bgcolor={"#eeeeee"}>
      <Stack direction={"row"} gap={1} height={"calc(100vh - 62px)"}>
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};
