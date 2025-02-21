export enum Gender {
  // eslint-disable-next-line no-unused-vars
  MALE = "Male",
  // eslint-disable-next-line no-unused-vars
  FEMALE = "Female",
}

export interface CourseInt {
  meta: string;
  id: string;
  title: string;
  slug: string;
  image: string;
  pricing?: PricingInt;
  instructors: Array<InstructorsInt>;
  type: string;
  aboutOrganization: string;
  rating: number;
  averageRating: any;
  coursesreviews: any;
  skills: any;
  target: string;
  requirement: string;
  scope: string;
  creator: string;
  reviews: any;
  organizationName: string;
  students: number;
  progress?: number;
  categoryId: any;
  level: string;
  lang: string;
  subtitleLanguage: string;
  sections: Array<any>;
  description: string;
  ratingsCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PricingInt {
  type?: string;
  amount?: number;
  currency?: string;
  discount: number;
}
interface InstructorsInt {
  name: string;
  bio: string;
  image: string;
}

export interface FundingInt {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  applicants?: number;
  avatar?: string;
  address: string;
  views?: number;
  author: UserInt;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FileInt {
  status: string;
  name: string;
  originFileObj: object;
}
export interface UploadInfoInt {
  file: FileInt;
  fileList: Array<object>;
}

export interface UserInt {
  id: number;
  roleId: number;
  status: boolean;
  fullname: string;
  firstname: string;
  lastname: string;
  username?: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  gender?: Gender;
  role?: string;
  createdAt: string;
  imageUrl?: string;
  companyName: string;
  updatedAt: string;
  isEmailVerify?: boolean;
}
