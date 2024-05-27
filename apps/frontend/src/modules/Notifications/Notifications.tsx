import { Divider, Stack, Typography } from "@mui/material";
import { NavLink, useOutlet } from "react-router-dom";
import { NotificationPlaceholder } from "./components/NotificationPlaceholder";
import { useStyle } from "./useStyle";

export const Notifications = () => {
  const outlet = useOutlet();
  const { notificationCount, bottomSidebar } = useStyle();

  const menus = [
    {
      title: "Friend requests",
      href: "/notifications/friend-requests",
      notificationCount: 0,
    },
    {
      title: "Friend requests sent",
      href: "/notifications/requests-sent",
      notificationCount: 2,
    },
  ];

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack sx={{ width: { md: "45%", lg: "34%" } }} gap={1}>
        <Stack
          p={3}
          bgcolor={"white"}
          borderRadius={"16px"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={"100px"}
          gap={1}
        >
          <Typography variant="h6" fontWeight={600}>
            Friends
          </Typography>
        </Stack>
        <Stack sx={bottomSidebar}>
          {menus.map((item) => {
            return (
              <>
                <NavLink to={item.href} style={{ textDecoration: "none" }}>
                  {({ isActive }) => {
                    return (
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        p={2}
                        bgcolor={isActive ? "#e9e9e9" : ""}
                      >
                        <Typography
                          color={isActive ? "primary.main" : "text.primary"}
                          fontWeight={isActive ? 600 : 400}
                        >
                          {item.title}
                        </Typography>
                        <Stack sx={notificationCount}>
                          {item.notificationCount}
                        </Stack>
                      </Stack>
                    );
                  }}
                </NavLink>
                <Divider variant="middle" />
              </>
            );
          })}
        </Stack>
      </Stack>
      <Stack flex={1} gap={1}>
        {outlet || <NotificationPlaceholder />}
      </Stack>
    </Stack>
  );
};
