import {createBrowserRouter} from "react-router";
import AppLayout from "@/layouts/app/AppLayout.jsx";
import DashboardPage from "@/pages/app/DashboardPage.jsx";
import AuthLayout from "@/layouts/auth/AuthLayout.jsx";
import LoginPage from "@/pages/auth/LoginPage.jsx";
import RegisterPage from "@/pages/auth/RegisterPage.jsx";
import FrontSidebarMenuPage from "@/pages/app/front/FrontSidebarMenuPage.jsx";
import FrontSidebarMenuCreatePage from "@/pages/app/front/FrontSidebarMenuCreatePage.jsx";
import SystemSettingPage from "@/pages/app/system/setting/SystemSettingPage.jsx";
import SystemSettingCreatePage from "@/pages/app/system/setting/SystemSettingCreatePage.jsx";
import SystemSettingUpdatePage from "@/pages/app/system/setting/SystemSettingUpdatePage.jsx";
import {FRONT_SIDEBAR_MENU_PATH, ROLE_PATH} from "@/constants/paths.jsx";
import RolePage from "@/pages/app/system/role/RolePage.jsx";
import RoleCreatePage from "@/pages/app/system/role/RoleCreatePage.jsx";
import FrontSidebarMenuUpdatePage from "@/pages/app/front/FrontSidebarMenuUpdatePage.jsx";
import RoleUpdatePage from "@/pages/app/system/role/RoleUpdatePage.jsx";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: AuthLayout,
        children: [
            { index: true, Component: LoginPage },
            { path: '/register', Component: RegisterPage }
        ]
    },
    {
        path: '/app',
        Component: AppLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: '/app/system-setting', Component: SystemSettingPage },
            { path: '/app/system-setting/create', Component: SystemSettingCreatePage },
            { path: '/app/system-setting/update/:id', Component: SystemSettingUpdatePage },
            { path: '/app/front/sidebar-menu', Component: FrontSidebarMenuPage },
            { path: '/app/front/sidebar-menu/create', Component: FrontSidebarMenuCreatePage },
            { path: `${FRONT_SIDEBAR_MENU_PATH}/update/:id`, Component: FrontSidebarMenuUpdatePage },
            { path: ROLE_PATH, Component: RolePage },
            { path: `${ROLE_PATH}/create`, Component: RoleCreatePage },
            { path: `${ROLE_PATH}/update/:id`, Component: RoleUpdatePage },
        ]
    }
]);

export default routes;
