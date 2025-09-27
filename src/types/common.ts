export interface IResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
}

export const DOMAIN = import.meta.env.VITE_API_URL;
