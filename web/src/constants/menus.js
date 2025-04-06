import {GenerateUniqueId} from "utils/helper";
import {ArtboardToolIcon, Calendar03Icon, ChartRelationshipIcon, Folder02Icon, Home01Icon} from "hugeicons-react";

export const AppMenus = [
    {
        id: GenerateUniqueId(),
        sectionTitle: 'Main'
    },
    {
        id: GenerateUniqueId(),
        title: 'Dashboard',
        icon: Home01Icon,
        href: '/dashboard',
    },
    {
        id: GenerateUniqueId(),
        sectionTitle: 'Content'
    },
    {
        id: GenerateUniqueId(),
        title: 'Calendar',
        icon: Calendar03Icon,
        href: '/calendar',
    },
    {
        id: GenerateUniqueId(),
        title: 'Content Library',
        icon: Folder02Icon,
        href: '/content-library',
    },
    {
        id: GenerateUniqueId(),
        title: 'Templates',
        icon: ArtboardToolIcon,
        href: '/template',
    },
    {
        id: GenerateUniqueId(),
        sectionTitle: 'Social Account'
    },
    {
        id: GenerateUniqueId(),
        title: 'Social Accounts',
        icon: ChartRelationshipIcon,
        href: '/social-account',
    },
];
