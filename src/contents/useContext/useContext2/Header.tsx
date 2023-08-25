import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { TitleContext } from "../../../context/TitleContext";

const Header = () => {
    const themeContext = useContext(ThemeContext);
    const titleContext = useContext(TitleContext);

    if (!themeContext) {
        throw new Error("Header must be used within a ThemeContext provider");
    }

    const { isDark } = themeContext;

    const className = "theme-" + (isDark ? "dark" : "normal");

    return (
        <header className={className}>
            <h1>Header - {titleContext}</h1>
        </header>
    );
};

export default Header;
