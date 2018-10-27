export interface IUser {
  id: Identifier;
  displayName: string;
  iconFilepath: string;
  emailAddress: string;
  firstName: string;
  familyName: string;
  firstNameKana: string;
  familyNameKana: string;
  birthday: Date;
  hireDate: Date;
  gender: Gender;
}

export interface IUserRegistration {
  password: string;
  displayName: string;
  iconFilepath: string;
  emailAddress: string;
  firstName: string;
  familyName: string;
  firstNameKana: string;
  familyNameKana: string;
  birthday: Date;
  hireDate: Date;
  gender: Gender;
}
