import {useSelector} from "store";
import Image from "next/image";
import Divider from "components/ui/Divider";
import AppSidebarItems from "layouts/app/components/AppSidebarItems";
import {AppMenus} from "constants/menus";

const Header = () => {
    return (
        <div className={`h-[50px] px-6 mt-2 flex items-center`}>
            <Image
                src="/images/logos/logo.svg"
                alt="logo"
                width={120}
                height={14}/>
        </div>
    )
};

export default function AppSidebar(props) {
    const { miniSidebar, miniSidebarWidth, sidebarWidth } = useSelector(state => state.theme);

    return (
        <div
            className={`px-6 bg-white border-r border-border-primary`}
            style={{ width: `${miniSidebar ? miniSidebarWidth : sidebarWidth}px`}}>
            <Header/>
            {/*<Divider/>*/}
            <AppSidebarItems items={AppMenus}/>
        </div>
    )
}
