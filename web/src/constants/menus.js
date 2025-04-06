import {GenerateUniqueId} from "utils/helper";
import {Calendar03Icon, Home01Icon} from "hugeicons-react";

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
];