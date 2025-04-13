import CardTheme from "theme/components/card";
import InputTheme from "theme/components/input";
import ButtonTheme from "theme/components/button";
import TypographyTheme from "theme/components/typography";
import TableTheme from "theme/components/table";
import IconButtonTheme from "theme/components/iconButton";

const components = () => {
    return {
        ...ButtonTheme(),
        ...CardTheme(),
        ...IconButtonTheme(),
        ...InputTheme(),
        ...TableTheme(),
        ...TypographyTheme(),
    }
};

export default components;
