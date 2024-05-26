import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_EXPLORE_USERS } from "./ExploreAPIRoutes";

interface UseGetUsersType {
  includeCurrentUser?: boolean;
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  searchText?: string;
}

const getExploreUsers = ({
  includeCurrentUser,
  searchText,
}: {
  includeCurrentUser?: boolean;
  searchText?: string;
}) => {
  return axiosAuth.get(GET_EXPLORE_USERS, {
    params: {
      includeCurrentUser,
      query: searchText,
    },
  });
};

export const useGetExploreUsers = ({
  queryParams,
  includeCurrentUser,
  searchText,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["exploreUsers", includeCurrentUser, searchText],
    queryFn: () => getExploreUsers({ includeCurrentUser, searchText }),
    select: (ele: any) => ele.data.data,
    ...queryParams,
  });
};
