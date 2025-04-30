import {
    CableIcon,
    CalendarCheckIcon,
    FolderOpenIcon,
    LayoutDashboardIcon,
    ListTodoIcon,
    NotepadTextDashedIcon,
    PanelLeftDashedIcon,
    ReceiptTextIcon,
    SettingsIcon,
    UsersRoundIcon,
    WaypointsIcon,
    WebhookIcon
} from "lucide-react";

export const AppMenuIcons = {
    dashboard: LayoutDashboardIcon,
    calendar: CalendarCheckIcon,
    contentLibrary: FolderOpenIcon,
    template: NotepadTextDashedIcon,
    frontSidebarMenu: PanelLeftDashedIcon,
    socialAccount: CableIcon,
    apiSetting: WebhookIcon,
    setting: SettingsIcon,
    role: WaypointsIcon,
    member: UsersRoundIcon,
    task: ListTodoIcon,
    billing: ReceiptTextIcon
};

export const SidebarMenusOrder = [
    'dashboard',
    'content',
    'calendar',
    'contentLibrary',
    'template',
    'socialAccount',
    'apiSetting',
    'team',
    'member',
    'task',
    'setting',
    'billing',
    'systemSetting',
    'frontSidebarMenu',
    'role'
];
