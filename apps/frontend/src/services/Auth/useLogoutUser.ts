import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axiosAuth } from "../../Auth";
import { LOGOUT_USER } from "./AuthApiRoutes";

const logoutUser = async () => {
  return await axiosAuth.post(LOGOUT_USER);
};

export const useLogoutUser = (
  queryParams?: UseMutationOptions<any, Error, string | undefined, unknown>
) =>
  useMutation<any, AxiosError, any>({
    mutationFn: logoutUser,
    ...queryParams,
  });
