import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { AuthUser } from "./authUser";
import { AuthenticationContext } from "./auth-context";
import axiosClient, { setLogoutHandler } from "../../utils/axiosClient";

const parsedToken = (token: string | null): AuthUser | null => {
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);

        const claimTypeUrl = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
        const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

        const user: AuthUser = {
            id: decoded[claimTypeUrl + "nameidentifier"],
            name: decoded[claimTypeUrl + "name"],
            email: decoded[claimTypeUrl + "emailaddress"],
            roles: decoded[roleClaim]
                ? Array.isArray(decoded[roleClaim])
                    ? decoded[roleClaim]
                    : [decoded[roleClaim]]
                : []
        };

        return user;
    } catch (err) {
        console.log("Jwt decode error", err);
        return null;
    }
};

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const storedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

    const [token, setToken] = useState<string | null>(storedToken);
    const [user, setUser] = useState<AuthUser | null>(() =>
        parsedToken(storedToken)
    );

    const returnUrl =
        new URLSearchParams(location.search).get("returnUrl") || "/";

    const login = (jwtToken: string, rememberMe = false) => {
        if (!jwtToken) return;

        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem("token", jwtToken);
        localStorage.setItem(
            "AuthenticationStorage",
            rememberMe ? "local" : "session"
        );

        (rememberMe ? sessionStorage : localStorage).removeItem("token");

        setToken(jwtToken);
        setUser(parsedToken(jwtToken));

        navigate(returnUrl);
    };

    const logout = useCallback(async () => {
        try {
            await axiosClient.post("/api/authentication/logout");
        } catch (err) {
            console.log("Logout API failed", err);
        }

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("AuthenticationStorage");

        setToken(null);
        setUser(null);

        navigate(
            `/login?returnUrl=${encodeURIComponent(location.pathname)}`,
            { replace: true }
        );
    }, [navigate, location.pathname]);

    useEffect(() => {
        setLogoutHandler(logout);
    }, [logout]);

    return (
        <AuthenticationContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};