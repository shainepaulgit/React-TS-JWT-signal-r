import type{ AuthUser } from "./authUser";

export interface AuthContextType{
    token: string | null;
    user: AuthUser | null;
    login: (jwtToken: string, rememberMe: boolean) => void;
    logout:()=> void;
}