import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../../Auth";
import { useSnackbar } from "../../../../../components";
import { useRemoveChat } from "../../../../../services";

export const useChatHeader = ({ chatData }: { chatData: any }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setSnackbarConfig } = useSnackbar();

  const { isGroupChat, users, groupTitle } = chatData;
  const senderUser = users.find((item: any) => item._id !== user.userId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: mutateRemoveChat } = useRemoveChat({
    onSuccess: () => {
      setSnackbarConfig({
        message: "User Unfriend Successfully",
        open: true,
        severity: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["ChatList"] });
    },
  });

  const handleOnClickUnfriend = () => {
    mutateRemoveChat({ userId: senderUser._id });
    navigate("/chat");
  };

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
    id,
    isGroupChat,
    groupTitle,
    senderUser,
    handleOnClickUnfriend,
  };
};
