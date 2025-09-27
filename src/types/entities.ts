export type UserType = {
  id: string;
  username: string;
  role: UserRole;
};
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type TodoType = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  userId: string;
  user: UserType;
};

export enum TodoStatus {
  PENDING = "pending",
  DONE = "done",
}
