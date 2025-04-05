'use client'

import {Provider} from "react-redux";
import store from "store";
import {usePathname} from "next/navigation";
import AppLayout from "layouts/app/AppLayout";

const RootApp = ({ children }) => {
    const pathname = usePathname();
    const Layout = AppLayout;

    return (
        <Layout>
            {children}
        </Layout>
    )
};

export default function BaseLayout({ children }) {
    return (
        <Provider store={store}>
            <RootApp>
                {children}
            </RootApp>
        </Provider>
    )
}
