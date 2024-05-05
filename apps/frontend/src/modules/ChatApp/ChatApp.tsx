import { Divider, Stack } from "@mui/material";
import React from "react";
import { NavLink, useOutlet } from "react-router-dom";
import { ChatCard } from "../../components";
import { ChatPlaceholder, ChatSearch } from "./components";
import { useStyle } from "./useStyle";

export const ChatApp = () => {
  const { chatListContainer } = useStyle();
  const outlet = useOutlet();

  return (
    <Stack direction={"row"} width={"100%"} gap={1}>
      <Stack width={"34%"} gap={1}>
        <ChatSearch />
        <Stack sx={chatListContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => {
            return (
              <div key={item}>
                <NavLink
                  to={`/chat/${item}`}
                  style={{ textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <ChatCard isActive={isActive} item={item} key={item} />
                  )}
                </NavLink>
                <Divider variant="middle" key={item} />
              </div>
            );
          })}
        </Stack>
      </Stack>
      <Stack flex={1} gap={1}>
        {outlet || <ChatPlaceholder />}
      </Stack>
    </Stack>
  );
};
