export interface LoginDto {
  identifier: string;
  password: string;
  method: number; // 0 for email, 1 for phone, etc.
}
