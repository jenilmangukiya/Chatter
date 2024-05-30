import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_FRIEND_REQUEST } from "./FriendsAPIRoutes";

interface UseGetUsersType {
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  type: "sent" | "received";
}

const getFriendRequest = ({ type }: { type: "sent" | "received" }) => {
  return axiosAuth.get(GET_FRIEND_REQUEST, {
    params: {
      type,
    },
  });
};

export const useGetFriendRequest = ({
  queryParams,
  type,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["requests", type],
    queryFn: () => getFriendRequest({ type }),
    select: (ele: any) => ele.data.data,
    ...queryParams,
  });
};
