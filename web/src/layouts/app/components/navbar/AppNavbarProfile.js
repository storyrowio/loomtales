'use client'

import {styled, useTheme} from "@mui/material/styles";
import {useState} from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ArrowDown01Icon, Logout02Icon, Settings02Icon, UserIcon} from "hugeicons-react";
import {Menu, MenuItem, Stack} from "@mui/material";
import * as React from "react";
import Divider from "@mui/material/Divider";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: 220,
        padding: theme.spacing(0.5, 1),
        borderRadius: 10,
        marginTop: theme.spacing(2.5),
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenuItem-root': {
            padding: theme.spacing(1.5, 2.5),
            background: 'transparent',
            borderRadius: 10,
            fontSize: 13,

            '&:hover': {
                background: theme.palette.grey.A100
            },

            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            }
        },
    },
}));

export default function AppNavbarProfile() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const menus = [
        { name: 'Profile', icon: UserIcon },
        { name: 'Setting', icon: Settings02Icon },
    ];

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                    padding: theme.spacing(0.75, 1),
                    cursor: 'pointer',
                    borderRadius: 3,
                    '&:hover': {
                        background: theme.palette.grey.A100
                    }
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Image
                    src="/images/avatar/avatar.png"
                    alt="avatar"
                    width={37}
                    height={37}/>
                <Box>
                    <Typography fontSize={12} fontWeight={700} color={theme.palette.grey.A700}>John Doe</Typography>
                    <Typography fontSize={10} color={theme.palette.grey["600"]}>Admin</Typography>
                </Box>
                <Box>
                    <ArrowDown01Icon
                        size={18}
                        color={theme.palette.grey["600"]}/>
                </Box>
            </Stack>
            <Box sx={{ position: 'relative' }}>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    {menus.map(({icon: Icon, ...e}, i) => (
                        <MenuItem
                            key={i}
                            sx={{ fontSize: 13, }}
                            onClick={() => setAnchorEl(null)}>
                            <Icon size={18} color={theme.palette.grey["600"]}/>
                            <Box width={10}/>
                            {e.name}
                        </MenuItem>
                    ))}
                    <Divider/>
                    <MenuItem
                        sx={{
                            color: theme.palette.error.main,
                            '&:hover': {
                                background: theme.palette.error.light,
                            }
                        }}
                        onClick={() => setAnchorEl(null)}>
                        <Logout02Icon size={18} color={theme.palette.error.main}/>
                        <Box width={10}/>
                        Logout
                    </MenuItem>
                </StyledMenu>
            </Box>
        </>
    )
}
