import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const Content = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Header must be used within a ThemeContext provider");
    }

    const { isDark } = themeContext;

    return (
        <section className={"content " + (isDark ? "dark" : "noDark")}>
            <h1>Content</h1>
        </section>
    );
};

export default Content;
