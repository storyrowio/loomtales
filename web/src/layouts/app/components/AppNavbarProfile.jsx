import Avatar from "@/assets/images/avatar/avatar.png";
import {
    MenubarContent, MenubarItem, MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from "@/components/ui/menubar.jsx";
import AppStorage from "@/lib/storage.jsx";
import {AUTH_TOKEN} from "@/constants/storage.jsx";
import {useNavigate} from "react-router";

export default function AppNavbarProfile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await AppStorage.RemoveItem(AUTH_TOKEN);
        navigate('/');
    };

    return (
        <MenubarMenu>
            <MenubarTrigger className="gap-2 rounded-lg  cursor-pointer">
                <img
                    alt="avatar"
                    src={Avatar}
                    style={{width: 36, height: 36}}/>
            </MenubarTrigger>
            <MenubarContent align="end">
                <MenubarItem inset>My Account</MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                    inset
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={handleLogout}>Logout</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    )
}
