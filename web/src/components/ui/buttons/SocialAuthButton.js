import {Button, styled} from "@mui/material";

const AuthButton= styled(Button)(({theme}) => ({
    paddingTop: 12,
    paddingBottom: 12
}));

export default function SocialAuthButton(props) {
    const { children, ...rest } = props;
    return (
        <AuthButton variant="tonal" {...rest}>
            {children}
        </AuthButton>
    )
}
