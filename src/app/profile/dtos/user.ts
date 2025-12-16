export interface UserDto {
  id: number;
  fcm_token: string | null;
  phoneNumber: string;
  email: string;
  names: string;
  surnames: string;
  address: string | null;
  imageProfile: string | null;
  fcmToken: string | null;
}
