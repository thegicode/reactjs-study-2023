import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Header = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Header must be used within a ThemeContext provider");
    }

    const { isDark } = themeContext;

    return (
        <header className={isDark ? "dark" : "noDark"}>
            <h1>Header</h1>
        </header>
    );
};

export default Header;
