import type { JSX } from "react";
import DashboardPage from "./pages/dashboardPage/dashboardPage";
import ProductPage from "./pages/productPage/productPage";
import PetPage from "./pages/petPage/petPage";
import NotificationPage from "./pages/notification/NotificationPage";

interface AppRoute{
    path: string;
    element: JSX.Element;
    roles?: string[];
}
export const AppRoutes: AppRoute[] = [
    { path: "/dashboard",element: <DashboardPage/>},
    { path: "/product", element: <ProductPage/>, roles: ["Client"] },
    { path: "/pet", element: <PetPage/>, roles: ["Admin"]},
    { path: "/notification", element: <NotificationPage /> }
];