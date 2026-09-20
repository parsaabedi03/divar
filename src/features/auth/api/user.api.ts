import axiosInstance from "@/lib/axios";

export type UserRole = "ADMIN" | "USER";

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
}

interface WhoAmIResponse {
  _id?: string;
  id?: string;
  role: UserRole;
  user?: {
    _id?: string;
    id?: string;
    role: UserRole;
  };
}

export const getCurrentUserRequest = async (): Promise<AuthenticatedUser> => {
  const { data } = await axiosInstance.get<WhoAmIResponse>("/user/whoami");
  const user = data.user ?? data;
  const id = user._id ?? user.id;

  if (!id) {
    throw new Error("The authenticated user response is missing an id");
  }

  return { id, role: user.role };
};
