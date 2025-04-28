import {
    CableIcon,
    CalendarCheckIcon,
    FolderOpenIcon,
    LayoutDashboardIcon,
    NotepadTextDashedIcon, PanelLeftDashedIcon, SettingsIcon, WaypointsIcon
} from "lucide-react";

export const AppMenuIcons = {
    dashboard: LayoutDashboardIcon,
    calendar: CalendarCheckIcon,
    contentLibrary: FolderOpenIcon,
    template: NotepadTextDashedIcon,
    frontSidebarMenu: PanelLeftDashedIcon,
    socialAccount: CableIcon,
    setting: SettingsIcon,
    role: WaypointsIcon
};

export const SidebarMenusOrder = [
    'dashboard',
    'content',
    'calendar',
    'contentLibrary',
    'template',
    'setting',
    'systemSetting',
    'frontSidebarMenu',
    'role'
];
