'use client'

import {styled, useTheme} from "@mui/material/styles";
import {useState} from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    ArrowDown01Icon, DartIcon,
    Logout02Icon,
    MessageMultiple01Icon, Notification01Icon,
    Notification02Icon,
    Settings02Icon,
    UserIcon
} from "hugeicons-react";
import {Menu, MenuItem, Stack} from "@mui/material";
import * as React from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {HexToRGBA} from "utils/theme";

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
        minWidth: 400,
        padding: theme.spacing(0.5, 1),
        borderRadius: 10,
        marginTop: theme.spacing(3.5),
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

const MenuItemIcon = styled(Box)(({theme}) => ({
    width: 45,
    height: 45,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export default function AppNavbarNotification() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const notifications = [
        {
            "id": 1,
            "type": "message",
            "title": "New message from Alice",
            "content": "Hey! Are you joining the meeting later?",
            "timestamp": "2025-04-10T09:15:00Z",
            "read": false
        },
        {
            "id": 2,
            "type": "mention",
            "title": "You were mentioned in a comment",
            "content": "@you Can you check this issue?",
            "timestamp": "2025-04-10T08:50:00Z",
            "read": false
        },
        {
            "id": 3,
            "type": "system",
            "title": "System Update Available",
            "content": "A new version of the app is ready to install.",
            "timestamp": "2025-04-09T18:30:00Z",
            "read": true
        },
        {
            "id": 4,
            "type": "activity",
            "title": "John liked your post",
            "content": "Your recent post on productivity tips got a new like.",
            "timestamp": "2025-04-09T17:00:00Z",
            "read": true
        },
        {
            "id": 5,
            "type": "reminder",
            "title": "Meeting at 3 PM",
            "content": "Don't forget your meeting with the design team at 3 PM.",
            "timestamp": "2025-04-10T06:00:00Z",
            "read": false
        }
    ];

    const renderIcon = (type) => {
        switch (type) {
            case 'message': {
                return { color: 'primary', icon: MessageMultiple01Icon };
            }
            case 'activity': {
                return { color: 'warning', icon: DartIcon };
            }
            case 'reminder': {
                return { color: 'success', icon: Notification01Icon };
            }
            default: {
                return { color: 'secondary', icon: Notification01Icon};
            }
        }
    };

    return (
        <>
            <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="outlined"
                sx={{ width: 37, height: 37, borderRadius: '50%' }}>
                <Notification02Icon size={18}/>
            </IconButton>
            <Box sx={{ position: 'relative' }}>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    {notifications.map((e, i) => {
                        const item = renderIcon(e.type);
                        const Icon = item.icon;
                        console.log('Item', e, item)
                        return (
                            <div key={i}>
                                <MenuItem
                                    key={i}
                                    sx={{ fontSize: 13, }}
                                    onClick={() => setAnchorEl(null)}>
                                    <MenuItemIcon sx={{
                                        background: HexToRGBA(theme.palette[item.color].main, 0.25)
                                    }}>
                                        <Icon/>
                                    </MenuItemIcon>
                                    <Box width={15}/>
                                    <Box>
                                        <Typography fontWeight={600}>{e.title}</Typography>
                                        <Typography fontSize={12}>{e.content}</Typography>
                                    </Box>
                                </MenuItem>
                                <Divider/>
                            </div>
                        )
                    })}
                </StyledMenu>
            </Box>
        </>
    )
}
