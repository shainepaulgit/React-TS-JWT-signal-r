import { createContext, useContext } from "react";
import type { AuthContextType } from "./authContextType";

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthenticationContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthenticationProvider");
    }
    return context;
};