import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_USERS } from "./ExploreAPIRoutes";

interface UseGetUsersType {
  includeCurrentUser?: boolean;
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  searchText?: string;
}

const getUsers = ({
  includeCurrentUser,
  searchText,
}: {
  includeCurrentUser?: boolean;
  searchText?: string;
}) => {
  return axiosAuth.get(GET_USERS, {
    params: {
      includeCurrentUser,
      query: searchText,
    },
  });
};

export const useGetUsers = ({
  queryParams,
  includeCurrentUser,
  searchText,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["users", includeCurrentUser, searchText],
    queryFn: () => getUsers({ includeCurrentUser, searchText }),
    select: (ele: any) => ele.data.data,
    ...queryParams,
  });
};
