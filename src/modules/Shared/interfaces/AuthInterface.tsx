export interface IRegisterData{
  profileImage:null|File ,
  userName:string,
  email:string,
  country:string,
  phoneNumber:string,
  confirmPassword:string,
  password:string
}
export  interface IVerfyData{
  email:string
  ,code:string
}

export interface resetData{
    email:string;
    seed:string;
    password :string;
    confirmPassword:string;
    state:string;
  }

  export interface forgetData{
    email:string
  }

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }

export interface LoginFormInputs{
  email:string,
  password:string
}
export interface IUser{

  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  isActivated: boolean;
  group: {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  };
  creationDate: string;
  modificationDate: string;

}
export  interface ILoginData {
userId: number;
roles: string[];
userName: string;
userEmail: string;
userGroup: string;
iat: number; 
exp: number; 
}