import { AxiosRequestConfig } from "axios";

export interface UserType {
  username: string;
  email: string;
  userId: string;
  fullName: string;
}

export interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

export interface AxiosResponseInterceptorsProps {
  children: React.ReactNode;
}
