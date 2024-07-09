import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink, useOutlet } from "react-router-dom";
import PageLoader from "../../components/PageLoader";
import { useGetFriendRequest } from "../../services";
import { useStyle } from "./useStyle";

export const Friends = () => {
  const outlet = useOutlet();
  const { notificationCount, bottomSidebar } = useStyle();
  const { data: requestsReceived, isLoading: isLoadingReceived } =
    useGetFriendRequest({
      type: "received",
    });

  const { data: requestsSent, isLoading: isLoadingSent } = useGetFriendRequest({
    type: "sent",
  });

  const menus = [
    {
      id: 1,
      title: "Friend requests",
      href: "/friends/friend-requests",
      notificationCount: requestsReceived?.length,
    },
    {
      id: 2,
      title: "Friend requests sent",
      href: "/friends/requests-sent",
      notificationCount: requestsSent?.length,
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
          {(isLoadingReceived || isLoadingSent) && (
            <PageLoader key={"loader"} />
          )}
          {!(isLoadingReceived || isLoadingSent) &&
            menus.map((item) => {
              return (
                <React.Fragment key={item.id}>
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
                </React.Fragment>
              );
            })}
        </Stack>
      </Stack>
      <Stack flex={1} gap={1}>
        {outlet}
      </Stack>
    </Stack>
  );
};
