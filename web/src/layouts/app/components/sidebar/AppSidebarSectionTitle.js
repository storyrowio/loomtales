import {useSelector} from "store";
import {motion} from "framer-motion";
import {CircleIcon} from "hugeicons-react";

export default function AppSidebarSectionTitle(props) {
    const { sectionTitle } = props;
    const { miniSidebar } = useSelector(state => state.theme);

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
        <div className="pt-6 pb-3 px-4 mt-6 flex items-center border-t-2 border-neutral-100">
            {miniSidebar ? (
                <motion.span
                    variants={textVariants}
                    className="text-xs font-medium"
                >
                    .
                </motion.span>
            ) : (
                <motion.span
                    variants={textVariants}
                    className="uppercase text-[10px] text-neutral-400 tracking-[0.15rem]"
                >
                    {sectionTitle}
                </motion.span>
            )}
        </div>
    )
}
