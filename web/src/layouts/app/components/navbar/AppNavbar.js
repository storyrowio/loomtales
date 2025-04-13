'use client'

import IconButton from "@mui/material/IconButton";
import {ArrowDown01Icon, Edit01Icon, Logout02Icon, Menu02Icon, Settings02Icon, UserIcon} from "hugeicons-react";
import {Menu, MenuItem, Stack, useMediaQuery} from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import * as React from "react";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import { styled, useTheme} from '@mui/material/styles';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {useState} from "react";
import Divider from "@mui/material/Divider";
import AppNavbarProfile from "layouts/app/components/navbar/AppNavbarProfile";
import AppNavbarNotification from "layouts/app/components/navbar/AppNavbarNotification";

const openedMixin = (theme, drawerWidth) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedMixin = (theme, miniDrawerWidth) => ({
    width: `calc(100% - ${miniDrawerWidth}px)`,
    marginLeft: `${miniDrawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
    }),
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})(({ theme, drawerWidth }) => ({
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    })
}));

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    gap: 5,

    [theme.breakpoints.down('md')]: {
        paddingX: theme.spacing(2.5)
    }
}));

export default function AppNavbar(props) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const { drawerWidth, miniDrawerWidth, sidebarOpen } = useSelector(state => state.theme);

    return (
        <AppBar
            position="fixed"
            elevation={0}
            open={sidebarOpen}
            drawerWidth={drawerWidth}
            sx={{
                ...!mobile && {
                    ...sidebarOpen && openedMixin(theme, drawerWidth),
                    ...!sidebarOpen && closedMixin(theme, miniDrawerWidth)
                }
            }}
        >
            <Toolbar>
                {mobile && (
                    <IconButton
                        variant="tonal"
                        onClick={() => dispatch(ThemeActions.setSidebarOpen(!sidebarOpen))}>
                        <Menu02Icon />
                    </IconButton>
                )}
                <Box flex={1}/>

                <AppNavbarNotification/>
                <AppNavbarProfile/>

                {/*<ProfileMenu*/}
                {/*    theme={theme}*/}
                {/*    onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}/>*/}
                {/*<Box sx={{ position: 'relative' }}>*/}
                {/*    <StyledMenu*/}
                {/*        anchorEl={anchorEl}*/}
                {/*        open={Boolean(anchorEl)}*/}
                {/*        onClose={() => setAnchorEl(null)}*/}
                {/*    >*/}
                {/*        {menus.map(({icon: Icon, ...e}, i) => (*/}
                {/*            <MenuItem*/}
                {/*                key={i}*/}
                {/*                sx={{ fontSize: 13, }}*/}
                {/*                onClick={() => setAnchorEl(null)}>*/}
                {/*                <Icon size={18} color={theme.palette.grey["600"]}/>*/}
                {/*                <Box width={10}/>*/}
                {/*                {e.name}*/}
                {/*            </MenuItem>*/}
                {/*        ))}*/}
                {/*        <Divider/>*/}
                {/*        <MenuItem*/}
                {/*            sx={{*/}
                {/*                color: theme.palette.error.main,*/}
                {/*                '&:hover': {*/}
                {/*                    background: theme.palette.error.light,*/}
                {/*                }*/}
                {/*            }}*/}
                {/*            onClick={() => setAnchorEl(null)}>*/}
                {/*            <Logout02Icon size={18} color={theme.palette.error.main}/>*/}
                {/*            <Box width={10}/>*/}
                {/*            Logout*/}
                {/*        </MenuItem>*/}
                {/*    </StyledMenu>*/}
                {/*</Box>*/}
            </Toolbar>
        </AppBar>
    )
}
