export interface DataUser {
  _id: string;
  index: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  latitude: number;
  longitude: number;
  hobbies: string[];
  age?: number;
}

export interface Message {
  message: string;
  email: string;
}
