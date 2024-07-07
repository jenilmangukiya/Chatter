import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../Auth";
import { useGetChat } from "../../../../services";
import { useGetUser } from "../../../../services/Explore/useGetUser";

export const useUserProfile = () => {
  const { id: chatId, userId } = useParams();
  console.log("userId", userId);
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);

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

  console.log(isUserDataLoading, isUserDataLoading);

  useEffect(() => {
    if (userData && !isUserDataLoading) {
      if (userData) {
        console.log("userData", userData);
        setUserDetails(userData);
      }
    }
  }, [userData, isUserDataLoading, userId]);

  return {
    userDetails,
    isLoading: isUserDataLoading || isChatDataLoading,
  };
};
