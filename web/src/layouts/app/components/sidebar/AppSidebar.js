'use client'

import {useDispatch, useSelector} from "store";
import {styled, useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {ArrowLeft01Icon, ArrowRight01Icon, Mail02Icon, Message02Icon} from "hugeicons-react";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {ThemeActions} from "store/slices/ThemeSlice";
import {Drawer, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "components/shared/Logo";
import AppSidebarItems from "layouts/app/components/sidebar/AppSidebarItems";
import {AppMenus} from "constants/menus";

const openedMixin = (theme, drawerWidth) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme, miniDrawerWidth) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: miniDrawerWidth,
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    position: 'relative',
    ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(Drawer)
(({theme}) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    '.MuiDrawer-paper': {
        background: theme.palette.background.paper,
    }
}));

export default function AppSidebar() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const { drawerWidth, miniDrawerWidth, sidebarOpen } = useSelector(state => state.theme);

    const handleToggle = () => {
        dispatch(ThemeActions.setSidebarOpen(!sidebarOpen));
    };

    return (
        <Box sx={{ position: 'relative' }}>
            {!mobile && (
                <IconButton
                    onClick={handleToggle}
                    sx={{
                        position: 'absolute',
                        right: -15,
                        top: 15,
                        zIndex: 9999
                    }} variant="outlined">
                    {!sidebarOpen ? <ArrowRight01Icon /> : <ArrowLeft01Icon />}
                </IconButton>
            )}
            <CustomDrawer
                open={sidebarOpen}
                onClose={handleToggle}
                variant={mobile ? 'temporary' : 'permanent'}
                sx={{
                    ...!mobile && {
                        ...sidebarOpen && {
                            ...openedMixin(theme, drawerWidth),
                            '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
                        },
                        ...!sidebarOpen && {
                            ...closedMixin(theme, miniDrawerWidth),
                            '& .MuiDrawer-paper': closedMixin(theme, miniDrawerWidth),
                        }
                    }
                }}
            >
                <DrawerHeader>
                    <Logo
                        width={!mobile && !sidebarOpen ? 35 : 140}
                        icon={!mobile && !sidebarOpen}/>
                </DrawerHeader>
                <Box sx={{ paddingX: 2 }}>
                    <Divider />
                    <AppSidebarItems items={AppMenus}/>
                </Box>
            </CustomDrawer>
        </Box>
    )
}
