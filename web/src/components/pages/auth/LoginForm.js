'use client'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Alert, Button, FormLabel, InputAdornment, Stack, TextField} from "@mui/material";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import {useTheme} from "@mui/material/styles";
import Image from "next/image";
import Logo from "components/shared/Logo";
import * as React from "react";
import {useFormik} from "formik";
import AuthService from "services/AuthService";
import {useRouter} from "next/navigation";
import SocialAuthButton from "components/ui/buttons/SocialAuthButton";
import {ViewIcon, ViewOffSlashIcon} from "hugeicons-react";

export default function LoginForm() {
    const router = useRouter();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        return AuthService.Login(values)
            .then(res => {
                setLoading(false);
                if (res.status === 200) {
                    return router.push('/app');
                }
            }).catch(err => {
                console.log(err.response)
                setError(err.response?.data?.message ?? 'Something wrong!');
            })
    };

    const handleSocialLogin = async (social) => {
        // const res = await signIn(social, {
        //     redirect: false,
        //     role: isOwner ? Roles.owner.value : Roles.customer.value,
        // });
    }

    return (
        <>
            <Box sx={{my: 4}}>
                <Typography variant='h4' fontSize={36} fontWeight={600} marginBottom={3}>
                    Login
                </Typography>
                <Typography sx={{color: 'text.secondary'}}>
                    Please sign-in to your account and start the adventure
                </Typography>
            </Box>

            {error && (
                <Alert icon={false} severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
            )}

            <form style={{ width: '100%' }}>
                <Stack justifyContent="center" spacing={1.5}>
                    <Box>
                        <FormLabel>Email Address</FormLabel>
                        <TextField
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Your email address"
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}
                            type="email"
                        />
                    </Box>
                    <Box>
                        <FormLabel>Password</FormLabel>
                        <TextField
                            fullWidth
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Your password"
                            error={Boolean(formik.errors.password)}
                            helperText={formik.errors.password}
                            type={showPassword ? 'text' : 'password'}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                sx={{ background: 'transparent' }}
                                                edge='end'
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <ViewIcon size={16}/> : <ViewOffSlashIcon size={16}/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                },
                            }}
                        />
                    </Box>
                    <Stack direction="row" justifyContent="end">
                        <Typography component={Link} href='/forgot-password' sx={{ color: theme.palette.primary.main, fontSize: 14 }}>
                            Forgot Password?
                        </Typography>
                    </Stack>
                    <Box height={10}/>
                    <Button fullWidth disabled={loading} type='submit' variant='contained'>
                        Login
                    </Button>
                </Stack>
            </form>

            <Box sx={{ marginTop: 6, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 0.5, fontSize: 12 }}>New on our platform?</Typography>
                <Typography href='/register' component={Link} sx={{ color: theme.palette.primary.main }} variant="caption">
                    Create an account
                </Typography>
            </Box>
            <Divider
                sx={{
                    color: 'text.disabled',
                    '& .MuiDivider-wrapper': { px: 6 },
                    fontSize: theme.typography.body2.fontSize,
                    my: theme => `${theme.spacing(4)} !important`
                }}
            >
                or
            </Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SocialAuthButton
                    fullWidth
                    color="primary"
                    startIcon={<Image src="/images/logos/social/google.svg" width={20} height={20} alt="logo"/>}
                    onClick={() => handleSocialLogin('google')}
                >
                    Login With Google
                </SocialAuthButton>
            </Box>
        </>
    )
}
