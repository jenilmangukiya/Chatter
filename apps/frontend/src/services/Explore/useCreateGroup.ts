import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { CREATE_GROUP_API } from "./ExploreAPIRoutes";

const sendUserRequest = async (data: any) => {
  return await axiosAuth.post(CREATE_GROUP_API, data);
};

export const useCreateGroup = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: sendUserRequest,
    ...queryParams,
  });
