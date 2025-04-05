import {useSelector} from "store";
import Image from "next/image";
import Divider from "components/ui/Divider";

const Header = () => {
    return (
        <div className={`h-[70px] px-6 flex items-center`}>
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
            <Divider/>
        </div>
    )
}
