import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Header must be used within a ThemeContext provider");
    }

    const { isDark, setIsDark } = themeContext;

    const toggle = () => {
        setIsDark(!isDark);
    };

    const className = "theme-" + (isDark ? "dark" : "normal");

    return (
        <footer className={className}>
            <h1>Footer</h1>
            <button onClick={toggle}>Dark Mode</button>
        </footer>
    );
};

export default Footer;
