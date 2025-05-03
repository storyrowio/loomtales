import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {useDispatch} from "@/store/index.jsx";
import {AppActions} from "@/store/slices/AppSlice.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";

export default function WorkspaceSwitcher(props) {
    const { items, active } = props;
    const dispatch = useDispatch();
    const { isMobile } = useSidebar();

    if (!active) {
        return null
    }

    const handleChangeWorkspace = (workspace) => {
        dispatch(AppActions.setActiveWorkspace(workspace))
    };

    const renderAvatar = () => {
        return (
            <Avatar className="rounded-sm">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback className="rounded-md bg-primary-500/20 text-primary font-semibold">
                    {active?.name?.split(" ").map(str => str[0]).join("")}
                </AvatarFallback>
            </Avatar>
        )
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {renderAvatar()}
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                  {active?.name}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Workspaces
                        </DropdownMenuLabel>
                        {items.map((item, index) => (
                            <DropdownMenuItem
                                key={index}
                                onClick={() => handleChangeWorkspace(item)}
                                className="gap-2 p-2"
                            >
                                {renderAvatar()}
                                {item.name}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">Add workspace</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
