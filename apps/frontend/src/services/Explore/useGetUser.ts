import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_USER } from "./ExploreAPIRoutes";

interface UseGetUsersType {
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  userId?: string;
}

const getUsers = ({ userId }: { userId?: string }) => {
  return axiosAuth.get(GET_USER(userId || ""));
};

export const useGetUser = ({
  queryParams,
  userId,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUsers({ userId }),
    select: (ele: any) => ele.data.data,
    ...queryParams,
  });
};
