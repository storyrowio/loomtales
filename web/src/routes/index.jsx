import {createBrowserRouter} from "react-router";
import BaseLayout from "../layouts/BaseLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import AppLayout from "layouts/app/AppLayout.jsx";
import DashboardPage from "pages/app/DashboardPage.jsx";

const routes = createBrowserRouter([
    {
        component: BaseLayout,
        children: [
            { index: true, Component: LoginPage },
            { path: '/register', Component: RegisterPage }
        ]
    },
    {
        path: '/app',
        Component: AppLayout,
        children: [
            { index: true, Component: DashboardPage }
        ]
    }
]);

export default routes;
