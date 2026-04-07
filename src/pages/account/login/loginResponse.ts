export interface LoginResponse {
  token?: string;
  requires2FA?: boolean;
  errorMessage?: string;
}