import { motion } from "framer-motion";
import {useSelector} from "store";

export default function AppSidebarItem(props) {
    const { item } = props;
    const { miniSidebar } = useSelector(state => state.theme);
    const Icon = item.icon;
    const active = false;

    const textVariants = {
        expanded: {
            opacity: 1,
            x: 0,
            display: "block",
            transition: {
                delay: 0.1,
                duration: 0.2
            }
        },
        collapsed: {
            opacity: 0,
            x: -10,
            transitionEnd: {
                display: "none"
            },
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.button
            className={`w-full px-4 py-2 my-[4px] rounded-xl ${active ? 'bg-primary-500' : 'bg-transparent'} cursor-pointer hover:bg-neutral-100`}>
            <div className="flex items-center">
                {item?.icon && (
                    <div className="w-[30px] h-[24px] flex items-center">
                        <Icon size={20} strokeWidth={2} className={`${active ? 'text-white' : 'text-neutral-500'}`}/>
                    </div>
                )}
                {!miniSidebar && (
                    <motion.span
                        variants={textVariants}
                        className={`text-sm ${active ? 'text-white' : 'text-neutral-500'}`}
                    >
                        {item.title}
                    </motion.span>
                )}
                {/*<p className={`text-sm ${active ? 'text-white' : 'text-neutral-500'}`}>{item.title}</p>*/}
            </div>
        </motion.button>
    )
}
