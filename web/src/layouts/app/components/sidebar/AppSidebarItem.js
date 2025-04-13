'use client'

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ArrowDown01Icon, ArrowUp01Icon, DashboardSquare02Icon} from "hugeicons-react";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import {useRouter} from "next/navigation";
import {styled, useTheme} from "@mui/material/styles";
import AppSidebarItems from "layouts/app/components/sidebar/AppSidebarItems";
import Box from "@mui/material/Box";
import {useMediaQuery} from "@mui/material";

const ItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 12
}));

const ChildrenBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0.5, 1),
    background: theme.palette.grey.A100,
    borderRadius: 15,
}));

export default function AppSidebarItem(props) {
    const { item } = props;
    const router = useRouter();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const { sidebarOpen, activeGroupMenu } = useSelector(state => state.theme);
    const Icon = item.icon;
    const active = false;
    const activeStyle = active ? theme.palette.background.paper : theme.palette.grey['600'];

    const handleClick = () => {
        if (item.children) {
            dispatch(ThemeActions.addUpdateActiveGroupMenu(item.id));
        } else {
            router.push(`/app/${item.href}`);
        }
    };
    console.log(sidebarOpen, mobile)
    return (
        <>
            <ItemButton onClick={handleClick}>
                {item.icon && (
                    <ListItemIcon sx={{ minWidth: 30 }}>
                        <Icon
                            size={18}
                            strokeWidth={2}
                            color={activeStyle}/>
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={item.title}
                    sx={{
                        opacity: sidebarOpen ? 1 : !mobile && 0,
                        transition: theme.transitions.create('all', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        '& .MuiTypography-root': {
                            fontWeight: 500,
                            fontSize: 14,
                            color: activeStyle
                        }
                    }}/>
                {item.children && (
                    <>
                        {activeGroupMenu?.includes(item.id) ?
                            <ArrowUp01Icon size={18} color={active ? theme.palette.background.paper : theme.palette.grey['600']}/> :
                            <ArrowDown01Icon size={18} color={active ? theme.palette.background.paper : theme.palette.grey['600']}/>}
                    </>
                )}
            </ItemButton>
            <Collapse in={activeGroupMenu?.includes(item.id)} timeout="auto" unmountOnExit>
                <ChildrenBox>
                    <AppSidebarItems items={item.children} sx={{ background: 'transparent' }}/>
                </ChildrenBox>
                {/*<List component="div" disablePadding>*/}
                {/*    <ListItemButton sx={{ pl: 4 }}>*/}
                {/*        <ListItemIcon>*/}
                {/*            <DashboardSquare02Icon />*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="Starred" />*/}
                {/*    </ListItemButton>*/}
                {/*</List>*/}
            </Collapse>
        </>
    )
}
