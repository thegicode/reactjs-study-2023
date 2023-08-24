import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { TitleContext } from "../../context/TitleContext";

const Content = () => {
    const themeContext = useContext(ThemeContext);
    const titleContext = useContext(TitleContext);

    if (!themeContext) {
        throw new Error("Header must be used within a ThemeContext provider");
    }

    const { isDark } = themeContext;

    const className = "content theme-" + (isDark ? "dark" : "normal");

    return (
        <section className={className}>
            <h1>Content - {titleContext}</h1>
        </section>
    );
};

export default Content;
