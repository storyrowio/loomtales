import Box from "@mui/material/Box";
import Image from "next/image";

export default function Logo(props) {
    const { width = 140, height = 40, icon = false } = props;
    const logo = icon ? '/images/logos/logo-icon.svg' : '/images/logos/logo.svg';

    return (
        <Box sx={{
            width, height,
            position: 'relative'
        }}>
            <Image src={logo} alt="logo" fill/>
        </Box>
    )
}
