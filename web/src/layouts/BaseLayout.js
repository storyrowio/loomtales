'use client'

import {usePathname} from "next/navigation";
import BlankLayout from "layouts/BlankLayout";
import AuthLayout from "layouts/auth/AuthLayout";
import AppLayout from "layouts/app/AppLayout";
import {Suspense} from "react";
import Theme from "theme";
import HolyLoader from "holy-loader";
import {Provider} from "react-redux";
import store from "store";

function RootApp({ children }) {
    const pathname = usePathname();

    let Layout = BlankLayout;

    if (pathname === '/login' || pathname === '/register') {
        Layout = AuthLayout;
    }

    if (pathname.includes('/app')) {
        Layout = AppLayout;
    }

    return (
        <Suspense>
            <Theme>
                <Layout>
                    {children}
                </Layout>
            </Theme>
        </Suspense>
    )
}

export default function BaseLayout({ children }) {
    return (
        <>
            <HolyLoader color="#757575"/>
            <Provider store={store}>
                <RootApp>
                    {children}
                </RootApp>
            </Provider>
        </>
    )
}
