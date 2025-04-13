'use client'

import Box from "@mui/material/Box";
import {Grid, useMediaQuery} from "@mui/material";
import Logo from "components/shared/Logo";
import Image from "next/image";
import {styled} from "@mui/material/styles";

const FormContent = styled(Box)(({theme}) => ({
    height: '100vh',
    padding: theme.spacing(16, 20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'center'
}));

export default function AuthLayout({ children }) {
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <FormContent>
                        <Logo width={240}/>
                        <Box height={40}/>
                        {children}
                    </FormContent>
                </Grid>
                {!mobile && (
                    <Grid size={6}>
                        <Box sx={{
                            width: '100%',
                            height: '100vh',
                            position: 'relative'
                        }}>
                            <Image
                                src="/images/auth/auth.png"
                                alt="illustration"
                                fill
                                style={{ objectFit: 'cover' }}/>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}
