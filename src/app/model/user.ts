export interface User {
  username: string;
  firstname: string|undefined;
  familyname: string|undefined;
  birthday: string;
  password: string;
  token: string;
  role: string[];

}
  export const NullUser={
    username:'u',
    firstname:'fi',
    familyname:'fa'
}
