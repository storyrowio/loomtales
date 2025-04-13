import {HexToRGBA} from "utils/theme";

const IconButtonTheme = () => {
    return {
        MuiIconButton: {
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: ({ theme }) => ({
                        border: `1px solid ${theme.palette.grey["300"]}`,
                        '&:hover': {
                            backgroundColor: theme.palette.grey.A100
                        }
                    })
                },
                {
                    props: { variant: 'outlined', color: 'primary' },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: HexToRGBA(theme.palette.primary.main, 0.08)
                        }
                    })
                },
                {
                    props: { variant: 'outlined', color: 'secondary' },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: HexToRGBA(theme.palette.secondary.main, 0.08)
                        }
                    })
                },
                {
                    props: { variant: 'outlined', color: 'success' },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: HexToRGBA(theme.palette.success.main, 0.08)
                        }
                    })
                },
                {
                    props: { variant: 'outlined', color: 'error' },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: HexToRGBA(theme.palette.error.main, 0.08)
                        }
                    })
                },
                {
                    props: { variant: 'outlined', color: 'warning' },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: HexToRGBA(theme.palette.warning.main, 0.08)
                        }
                    })
                },
                {
                    props: { variant: 'outlined', color: 'info' },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: HexToRGBA(theme.palette.info.main, 0.08)
                        }
                    })
                },
                {
                    props: { variant: 'tonal' },
                    style: ({ theme }) => ({
                        color: theme.palette.grey.A700,
                        backgroundColor: theme.palette.grey.A100,
                        '&:hover, &:active': { backgroundColor: theme.palette.grey.A200 }
                    })
                },
                {
                    props: { variant: 'tonal', color: 'primary' },
                    style: ({ theme }) => ({
                        color: theme.palette.primary.main,
                        backgroundColor: HexToRGBA(theme.palette.primary.main, 0.16),
                        '&:hover, &:active': { backgroundColor: HexToRGBA(theme.palette.primary.main, 0.24) }
                    })
                },
                {
                    props: { variant: 'tonal', color: 'secondary' },
                    style: ({ theme }) => ({
                        color: theme.palette.secondary.main,
                        backgroundColor: HexToRGBA(theme.palette.secondary.main, 0.16),
                        '&:hover, &:active': { backgroundColor: HexToRGBA(theme.palette.secondary.main, 0.24) }
                    })
                },
                {
                    props: { variant: 'tonal', color: 'error' },
                    style: ({ theme }) => ({
                        color: theme.palette.error.main,
                        backgroundColor: HexToRGBA(theme.palette.error.main, 0.16),
                        '&:hover, &:active': { backgroundColor: HexToRGBA(theme.palette.error.main, 0.24) }
                    })
                },
                {
                    props: { variant: 'tonal', color: 'warning' },
                    style: ({ theme }) => ({
                        color: theme.palette.warning.main,
                        backgroundColor: HexToRGBA(theme.palette.warning.main, 0.16),
                        '&:hover, &:active': { backgroundColor: HexToRGBA(theme.palette.warning.main, 0.24) }
                    })
                },
                {
                    props: { variant: 'tonal', color: 'info' },
                    style: ({ theme }) => ({
                        color: theme.palette.info.main,
                        backgroundColor: HexToRGBA(theme.palette.info.main, 0.16),
                        '&:hover, &:active': { backgroundColor: HexToRGBA(theme.palette.info.main, 0.24) }
                    })
                },
                {
                    props: { variant: 'tonal', color: 'success' },
                    style: ({ theme }) => ({
                        color: theme.palette.success.main,
                        backgroundColor: HexToRGBA(theme.palette.success.main, 0.16),
                        '&:hover, &:active': { backgroundColor: HexToRGBA(theme.palette.success.main, 0.24) }
                    })
                }
            ],
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    width: 32,
                    height: 32,
                    padding: theme.spacing(0.75),
                    borderRadius: 10,
                    background: theme.palette.background.paper,
                    transition: theme.transitions.create(
                        ['background-color', 'box-shadow', 'border-color', 'color', 'transform'],
                        { duration: theme.transitions.duration.shortest }
                    ),

                    '&:hover': {
                        background: theme.palette.grey.A100,
                    }
                }),
                contained: ({ theme }) => ({
                    boxShadow: theme.shadows[2],
                    // padding: theme.spacing(1.5, 5),
                    '&:hover': {
                        boxShadow: theme.shadows[2]
                    }
                }),
                tonal: ({ theme, ownerState }) => ({
                    border: 'none',
                    background: theme.palette.grey.A100,
                    '&.Mui-disabled': {
                        backgroundColor: theme.palette.action.disabledBackground
                    },
                    ...(ownerState.color === 'primary' && {
                        borderColor: theme.palette.primary.light
                    }),
                }),
                outlined: ({ theme, ownerState }) => ({
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme.palette.border.primary,
                    ...(ownerState.color === 'primary' && {
                        borderColor: theme.palette.primary.main
                    }),
                    ...(ownerState.color === 'secondary' && {
                        borderColor: theme.palette.secondary.main
                    }),
                    ...(ownerState.color === 'success' && {
                        borderColor: theme.palette.success.main
                    }),
                    ...(ownerState.color === 'error' && {
                        borderColor: theme.palette.error.main
                    }),
                    ...(ownerState.color === 'warning' && {
                        borderColor: theme.palette.warning.main
                    }),
                    ...(ownerState.color === 'info' && {
                        borderColor: theme.palette.info.main
                    })
                }),
                // sizeSmall: ({ ownerState, theme }) => ({
                //     lineHeight: 1.231,
                //     borderRadius: '10px',
                //     fontSize: '0.8125rem',
                //     ...(ownerState.variant === 'text' && {
                //         padding: theme.spacing(1.5, 2.25)
                //     }),
                //     ...((ownerState.variant === 'contained' || ownerState.variant === 'tonal') && {
                //         padding: theme.spacing(1.5, 3.5)
                //     }),
                //     ...(ownerState.variant === 'outlined' && {
                //         padding: theme.spacing(1.25, 3.25)
                //     })
                // }),
                // sizeLarge: ({ ownerState, theme }) => ({
                //     lineHeight: 1.295,
                //     borderRadius: '14px',
                //     fontSize: '1.0625rem',
                //     ...(ownerState.variant === 'text' && {
                //         padding: theme.spacing(3.25, 4)
                //     }),
                //     ...((ownerState.variant === 'contained' || ownerState.variant === 'tonal') && {
                //         padding: theme.spacing(3.25, 6.5)
                //     }),
                //     ...(ownerState.variant === 'outlined' && {
                //         padding: theme.spacing(3, 6.25)
                //     })
                // })
            }
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true
            }
        }
    }
};

export default IconButtonTheme;
