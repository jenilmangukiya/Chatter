import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { axiosAuth } from "../../Auth";
import { GET_USERS } from "./ExploreAPIRoutes";

interface UseGetUsersType {
  queryParams?: Omit<UseQueryOptions, "queryKey">;
  searchText?: string;
}

const getUsers = ({ searchText }: { searchText?: string }) => {
  return axiosAuth.get(GET_USERS, {
    params: {
      query: searchText,
    },
  });
};

export const useGetUsers = ({
  queryParams,
  searchText,
}: UseGetUsersType): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["users", searchText],
    queryFn: () => getUsers({ searchText }),
    select: (ele: any) => ele.data.data,
    ...queryParams,
  });
};
