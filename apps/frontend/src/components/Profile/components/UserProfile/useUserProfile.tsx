import { Done, PersonAdd, PersonRemove, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../Auth";
import { useGetChat, useGetUser } from "../../../../services";

const getButtonConfig = (friendship_status: any) => {
  if (friendship_status?.incoming_request) {
    return {
      text: "Confirm Request",
      color: "success",
      variant: "contained",
      icon: <Done />,
    };
  } else if (friendship_status?.outgoing_request) {
    return {
      text: "Unsend Request",
      color: "error",
      variant: "contained",
      icon: <Remove />,
    };
  } else if (friendship_status?.is_friend) {
    return {
      text: "unfriend",
      color: "error",
      variant: "outlined",
      icon: <PersonRemove />,
    };
  } else {
    return {
      text: "Send Request",
      color: "success",
      variant: "contained",
      icon: <PersonAdd />,
    };
  }
};

export const useUserProfile = () => {
  const { id: chatId, userId } = useParams();

  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [buttonConfig, setButtonConfig] = useState<any>({
    text: "",
    color: "primary",
    variant: "contained",
    icon: <Done />,
  });

  const { data: chatData, isLoading: isChatDataLoading } = useGetChat({
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

  const { data: userData, isLoading: isUserDataLoading } = useGetUser({
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

  return {
    userDetails,
    isLoading: isUserDataLoading || isChatDataLoading,
    buttonConfig,
  };
};
