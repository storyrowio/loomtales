import {useDispatch, useSelector} from "store";
import Image from "next/image";
import AppSidebarItems from "layouts/app/components/sidebar/AppSidebarItems";
import {AppMenus} from "constants/menus";
import {ArrowLeft01Icon} from "hugeicons-react";
import IconButton from "components/ui/buttons/IconButton";
import {ThemeActions} from "store/slices/ThemeSlice";
import { motion } from "framer-motion";

const Header = ({ miniSidebar }) => {
    const dispatch = useDispatch();

    return (
        <div className={`h-[35px] mt-2 flex items-end relative`}>
            <Image
                src={miniSidebar ? '/images/logos/logo-icon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    .svg' : '/images/logos/logo.svg'}
                alt="logo"
                width={140}
                height={34}/>
            <IconButton
                className="!size-[32px] !border-1 rounded-md absolute top-[0.5rem] -right-[40px]"
                onClick={() => dispatch(ThemeActions.setMiniSidebar(!miniSidebar))}
            >
                <ArrowLeft01Icon size={18} strokeWidth={2} className="text-neutral-500"/>
            </IconButton>
        </div>
    )
};

export default function AppSidebar(props) {
    const { miniSidebar, miniSidebarWidth, sidebarWidth } = useSelector(state => state.theme);

    const sidebarVariants = {
        expanded: {
            width: "240px",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        collapsed: {
            width: "80px",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    };

    return (
        <motion.nav
            initial="expanded"
            animate={!miniSidebar ? "expanded" : "collapsed"}
            variants={sidebarVariants}
            className={`sticky z-10 top-0 h-screen shrink-0 bg-white border-r border-border-primary ${miniSidebar ? 'px-3' : 'px-6'}`}
            style={{width: `${miniSidebar ? miniSidebarWidth : sidebarWidth}px`}}>
            <div
                // className={`min-h-screen px-6 bg-white border-r border-border-primary`}
                >
                <Header miniSidebar={miniSidebar}/>
                {/*<Divider/>*/}
                <AppSidebarItems items={AppMenus}/>
            </div>
        </motion.nav>
    )
}
