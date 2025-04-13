import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "store";
import {MoreHorizontalCircle01Icon} from "hugeicons-react";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";

export default function AppSidebarSectionTitle(props) {
    const { sectionTitle } = props;
    const theme = useTheme();
    const { sidebarOpen } = useSelector(state => state.theme);

    return !sidebarOpen ? (
        <Stack direction="row" justifyContent="center" alignItems="center" height={39}>
            <MoreHorizontalCircle01Icon size={20} color={theme.palette.grey.A400}/>
        </Stack>
    ) : (
        <Typography
            sx={{
                height: 15,
                margin: theme.spacing(2, 0, 1),
                fontSize: 10,
                fontWeight: 600,
                color: theme.palette.grey["500"],
                textTransform: 'uppercase',
                letterSpacing: 2,
            }}>
            {sectionTitle}
        </Typography>
    )
}
