import { Done, PersonAdd, PersonRemove, Remove } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../Auth";
import {
  useApproveFriendRequest,
  useCancelFriendRequest,
  useGetChat,
  useGetUser,
  useSendFriendRequest,
} from "../../../../services";
import { useSnackbar } from "../../../SnackbarAlert";
import { ButtonConfigType } from "./types";

const getButtonConfig = (friendship_status: {
  incoming_request: boolean;
  outgoing_request: boolean;
  is_friend: boolean;
  request_id: null | string;
}): ButtonConfigType => {
  if (friendship_status?.incoming_request) {
    return {
      name: "confirm_request",
      text: "Confirm Request",
      color: "success",
      variant: "contained",
      icon: <Done />,
    };
  } else if (friendship_status?.outgoing_request) {
    return {
      name: "unsend_request",
      text: "Unsend Request",
      color: "error",
      variant: "contained",
      icon: <Remove />,
    };
  } else if (friendship_status?.is_friend) {
    return {
      name: "unfriend",
      text: "unfriend",
      color: "error",
      variant: "outlined",
      icon: <PersonRemove />,
    };
  } else {
    return {
      name: "send_request",
      text: "Send Request",
      color: "success",
      variant: "contained",
      icon: <PersonAdd />,
    };
  }
};

export const useUserProfile = () => {
  const { id: chatId, userId } = useParams();
  const queryClient = useQueryClient();
  const { setSnackbarConfig } = useSnackbar();
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [buttonConfig, setButtonConfig] = useState<ButtonConfigType>({
    name: "send_request",
    text: "Send Request",
    color: "success",
    variant: "contained",
    icon: <PersonAdd />,
  });

  const refetchUserData = () => {
    if (chatId) {
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    }
    if (userId) {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    }
  };
  const {
    data: chatData,
    isLoading: isChatDataLoading,
    isRefetching: isChatDataRefetching,
  } = useGetChat({
    chatId: chatId || undefined,
    queryParams: {
      throwOnError: () => {
        return false;
      },
      enabled: !!chatId,
      retry: 1,
      gcTime: 0,
    },
  });

  useEffect(() => {
    if (chatData && !isChatDataLoading) {
      const senderUser = chatData?.users?.find(
        (item: any) => item._id !== user.userId
      );
      if (senderUser) {
        setUserDetails(senderUser);
        setButtonConfig(getButtonConfig(senderUser.friendship_status));
      }
    }
  }, [chatData, isChatDataLoading]);

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isRefetching: isUserDataRefetching,
  } = useGetUser({
    userId: userId,
    queryParams: {
      throwOnError: () => {
        return false;
      },
      enabled: !!userId,
      retry: 1,
      gcTime: 0,
    },
  });

  useEffect(() => {
    if (userData && !isUserDataLoading) {
      if (userData) {
        setUserDetails(userData);
        setButtonConfig(getButtonConfig(userData.friendship_status));
      }
    }
  }, [userData, isUserDataLoading, userId]);

  const { mutate: mutateApproveRequest, isPending: isApproveRequestPending } =
    useApproveFriendRequest({
      onSuccess: () => {
        setSnackbarConfig({
          message: "Friend Request Approved",
          open: true,
          severity: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["requests", "received"] });
        refetchUserData();
      },
    });

  const {
    mutate: mutateCancelFriendRequest,
    isPending: isCancelRequestPending,
  } = useCancelFriendRequest({
    onSuccess: () => {
      setSnackbarConfig({
        message: "Request canceled successfully",
        open: true,
        severity: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["requests", "sent"] });
      refetchUserData();
    },
  });

  const { mutate: mutateSendFriendRequest, isPending: isSendRequestPending } =
    useSendFriendRequest({
      onSuccess: (e) => {
        setSnackbarConfig({
          message: e.data.message,
          open: true,
          severity: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["exploreUsers"] });
        refetchUserData();
      },
    });

  const handleOnButtonClick = () => {
    if (
      buttonConfig.name === "confirm_request" &&
      userDetails.friendship_status.request_id
    ) {
      mutateApproveRequest(userDetails.friendship_status.request_id);
    } else if (
      buttonConfig.name === "unsend_request" &&
      userDetails.friendship_status.request_id
    ) {
      mutateCancelFriendRequest(userDetails.friendship_status.request_id);
    } else if (buttonConfig.name === "unfriend") {
      console.log("TODO: Implement API");
    } else if (buttonConfig.name === "send_request") {
      mutateSendFriendRequest({
        userId: userDetails._id,
      });
    } else {
      setSnackbarConfig({
        open: true,
        message: "Something went wrong please try again after some time",
        severity: "error",
      });
    }
  };

  return {
    userDetails,
    isLoading: isUserDataLoading || isChatDataLoading,
    isActionButtonLoading:
      isSendRequestPending ||
      isApproveRequestPending ||
      isCancelRequestPending ||
      isUserDataLoading ||
      isChatDataLoading ||
      isUserDataRefetching ||
      isChatDataRefetching,
    buttonConfig,
    handleOnButtonClick,
  };
};
