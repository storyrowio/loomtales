'use client'

import IconButton from "components/ui/buttons/IconButton";
import {ArrowDown01Icon, Notification01Icon} from "hugeicons-react";
import Image from "next/image";

const ProfileMenu = () => {
    return (
        <div className="p-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-neutral-100">
            <Image
                src="/images/avatar/avatar.png"
                alt="avatar"
                width={37}
                height={37}/>
            <div className="w-20">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-neutral-500">Admin</p>
            </div>
            <div>
                <ArrowDown01Icon className="text-text-primary" size={18}/>
            </div>
        </div>
    )
};

export default function AppNavbar() {
    return (
        <div className={`w-screen h-[70px] px-4 bg-white border-b border-border-primary fixed top-0 left-0 flex items-center justify-end gap-3`}>
            <IconButton rounded>
                <Notification01Icon size={16} strokeWidth={2} className="text-neutral-400"/>
            </IconButton>
            <ProfileMenu/>
        </div>
    )
}
