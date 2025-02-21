import { UserInt } from "@/app/utils/interface";

export interface TeamInt {
  id: number;
  title: string;
  description: string;
  teammembers: Array<ITeamMember>;
}

export interface ITeamMember {
  name: string;
  id: number;
  user: UserInt;
}
