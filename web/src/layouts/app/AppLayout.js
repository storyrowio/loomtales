import AppSidebar from "layouts/app/components/sidebar/AppSidebar";
import AppNavbar from "layouts/app/components/navbar/AppNavbar";
import {useDispatch, useSelector} from "store";

const AppContent = (props) => {
    const { miniSidebar, miniSidebarWidth, sidebarWidth, children } = props;

    return (
        <div className={`pt-[70px] ml-[${miniSidebar ? miniSidebarWidth : sidebarWidth}px]`}>
            {children}
        </div>
    )
};

export default function AppLayout({ children }) {
    const { ...state } = useSelector(state => state.theme);

    return (
        <div className="flex relative">
            <AppSidebar/>
            <div className="w-full">
                <AppNavbar/>
                <AppContent {...state}>
                    {children}
                </AppContent>
            </div>
        </div>
    )
}
