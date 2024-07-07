import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useGetChat, useRemoveChatMember } from "../../../../services";
import { useSnackbar } from "../../../SnackbarAlert";

export const useGroupProfile = () => {
  const { id: chatId } = useParams();
  const queryClient = useQueryClient();
  const { setSnackbarConfig } = useSnackbar();

  const {
    data: chatData,
    isLoading: isChatDataLoading,
    isError: isChatDataError,
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

  const { mutate: removeMemberMutate } = useRemoveChatMember({
    onSuccess: () => {
      setSnackbarConfig({
        message: "Member successfully removed",
        open: true,
        severity: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
      queryClient.invalidateQueries({ queryKey: ["ChatList", ""] });
    },
    onError(error: any) {
      setSnackbarConfig({
        message:
          error?.response?.data?.message ||
          "Something went wrong please try again",
        open: true,
        severity: "error",
      });
    },
  });

  const handleOnRemoveClick = (memberId: string) => {
    removeMemberMutate({ chatId, memberId });
  };

  return { handleOnRemoveClick, chatData, isChatDataLoading };
};
