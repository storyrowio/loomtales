import {
    CableIcon,
    CalendarCheckIcon, DoorOpenIcon,
    FolderOpenIcon,
    LayoutDashboardIcon,
    ListTodoIcon, MonitorCogIcon,
    NotepadTextDashedIcon,
    PanelLeftDashedIcon,
    ReceiptTextIcon,
    SettingsIcon,
    UsersRoundIcon,
    WaypointsIcon,
    WebhookIcon
} from "lucide-react";

export const Feature = {
    dashboard: { name: 'Dashboard', value: 'dashboard', icon: LayoutDashboardIcon },
    content: { name: 'Content', value: 'content' },
    calendar: { name: 'Calendar', value: 'calendar', icon: CalendarCheckIcon },
    contentLibrary: { name: 'Content Library', value: 'contentLibrary', icon: FolderOpenIcon },
    template: { name: 'Template', value: 'template', icon: NotepadTextDashedIcon },
    socialAccount: { name: 'Social Account', value: 'socialAccount', icon: CableIcon },
    apiSetting: { name: 'Api Setting', value: 'apiSetting', icon: WebhookIcon },
    team: { name: 'Team', value: 'team' },
    member: { name: 'Member', value: 'member', icon: UsersRoundIcon },
    task: { name: 'Task', value: 'task', icon: ListTodoIcon },
    setting: { name: 'Setting', value: 'setting', icon: SettingsIcon },
    billing: { name: 'Billing', value: 'billing', icon: ReceiptTextIcon },
    systemSetting: { name: 'System Setting', value: 'system:setting', icon: MonitorCogIcon },
    user: { name: 'User', value: 'user', icon: UsersRoundIcon },
    role: { name: 'Role', value: 'role', icon: WaypointsIcon },
    frontSidebarMenu: { name: 'Front Sidebar Menu', value: 'frontSidebarMenu', icon: PanelLeftDashedIcon },
    permission: { name: 'Permission', value: 'permission', icon: DoorOpenIcon },
};
