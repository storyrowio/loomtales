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
import {CONTENT_PATH, FRONT_SIDEBAR_MENU_PATH, MEMBER_PATH, PERMISSION_PATH, ROLE_PATH} from "@/constants/paths.jsx";
import RolePage from "@/pages/app/system/role/RolePage.jsx";
import RoleCreatePage from "@/pages/app/system/role/RoleCreatePage.jsx";
import FrontSidebarMenuUpdatePage from "@/pages/app/front/FrontSidebarMenuUpdatePage.jsx";
import RoleUpdatePage from "@/pages/app/system/role/RoleUpdatePage.jsx";
import MemberPage from "@/pages/app/member/MemberPage.jsx";
import MemberInviteConfirmPage from "@/pages/member/MemberInviteConfirmPage.jsx";
import PermissionPage from "@/pages/app/system/permission/PermissionPage.jsx";
import PermissionCreatePage from "@/pages/app/system/permission/PermissionCreatePage.jsx";
import PermissionUpdatePage from "@/pages/app/system/permission/PermissionUpdatePage.jsx";
import ContentPage from "@/pages/app/content/ContentPage.jsx";
import ContentCreatePage from "@/pages/app/content/ContentCreatePage.jsx";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: AuthLayout,
        children: [
            { index: true, Component: LoginPage },
            { path: '/register', Component: RegisterPage },
            { path: '/member/invite/confirm/:token', Component: MemberInviteConfirmPage }
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
            { path: MEMBER_PATH, Component: MemberPage },
            { path: ROLE_PATH, Component: RolePage },
            { path: `${ROLE_PATH}/create`, Component: RoleCreatePage },
            { path: `${ROLE_PATH}/update/:id`, Component: RoleUpdatePage },
            { path: `${PERMISSION_PATH}`, Component: PermissionPage },
            { path: `${PERMISSION_PATH}/create`, Component: PermissionCreatePage },
            { path: `${PERMISSION_PATH}/update`, Component: PermissionUpdatePage },

            { path: `${CONTENT_PATH}`, Component: ContentPage },
            { path: `${CONTENT_PATH}/create`, Component: ContentCreatePage }
        ]
    }
]);

export default routes;
