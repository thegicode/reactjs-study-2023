import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function UseConText1() {
    const [isDark, setIsDark] = useState<boolean>(false);
    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            <Page />
        </ThemeContext.Provider>
    );
}

const Page = () => {
    return (
        <div className="useContext1">
            <Header />
            <Content />
            <Footer />
        </div>
    );
};

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

const Footer = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Header must be used within a ThemeContext provider");
    }

    const { isDark, setIsDark } = themeContext;

    const toggle = () => {
        setIsDark(!isDark);
    };

    return (
        <footer className={isDark ? "dark" : "noDark"}>
            <h1>Footer</h1>
            <button onClick={toggle}>Dark Mode</button>
        </footer>
    );
};
