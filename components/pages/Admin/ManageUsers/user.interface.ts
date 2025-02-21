import { UserInt } from "@/app/utils/interface";

export interface UserListInt {
  apiKey: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  id: number;
  phone: string;
  country: string;
  city: string;
  state: string;
  isEmailVerify: boolean;
  token: string;
  createdAt: string;
  status: boolean;
  imageUrl: string;
}
export interface UsersProps {
  usersList: UserListInt[];
  fetchUsers: Function;
  allUsers: UserInt[];
}
