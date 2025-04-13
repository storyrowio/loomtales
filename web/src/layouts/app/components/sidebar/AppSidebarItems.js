'use client'

import * as React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {ArrowDown01Icon, ArrowUp01Icon, DashboardSquare02Icon} from "hugeicons-react";
import {AppMenus} from "constants/menus";
import AppSidebarItem from "layouts/app/components/sidebar/AppSidebarItem";
import AppSidebarSectionTitle from "layouts/app/components/sidebar/AppSidebarSectionTitle";

export default function AppSidebarItems(props) {
    const { items, ...rest } = props;

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} {...rest}>
            {items.map((e, i) => {
                if (e.sectionTitle) {
                    return <AppSidebarSectionTitle key={i} sectionTitle={e.sectionTitle}/>
                }

                return <AppSidebarItem key={i} item={e}/>
            })}
        </List>
)
}
