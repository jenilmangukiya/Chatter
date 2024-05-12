import { useEffect } from "react";

import { AxiosRequestConfig } from "axios";

import axiosAuth from "./axiosAuth";
import { AxiosResponseInterceptorsProps, RetryQueueItem } from "./types";
import { useAuth } from "./useAuth";
import { refreshAccessToken } from "./utils";

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

const AxiosResponseInterceptors: React.FC<AxiosResponseInterceptorsProps> = ({
  children,
}) => {
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const responseInterceptor = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest: AxiosRequestConfig = error.config;

        if (error.response && error.response.status === 401) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const newAccessToken = await refreshAccessToken();
              if (!newAccessToken) {
                setIsAuthenticated(false);
                throw new Error("Invalid Refresh Token");
              }

              await Promise.all(
                refreshAndRetryQueue.map(({ config }) =>
                  axiosAuth.request(config)
                )
              );

              refreshAndRetryQueue.length = 0;
              return axiosAuth(originalRequest);
            } catch (refreshError) {
              console.error("refreshError", refreshError);
              throw refreshError;
            } finally {
              isRefreshing = false;
            }
          }
          return new Promise<void>((resolve, reject) => {
            refreshAndRetryQueue.push({
              config: originalRequest,
              resolve,
              reject,
            });
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsAuthenticated]);
  return children;
};

export default AxiosResponseInterceptors;
