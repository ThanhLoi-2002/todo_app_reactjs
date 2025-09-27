export interface IResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
}

export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};