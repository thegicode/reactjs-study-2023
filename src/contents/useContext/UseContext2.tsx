import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { TitleContext } from "../../context/TitleContext";

export default function UseConText2() {
    const [isDark, setIsDark] = useState<boolean>(false);
    return (
        <TitleContext.Provider value="예쁜 타이틀 컨텍스트">
            <ThemeContext.Provider value={{ isDark, setIsDark }}>
                <Page />
            </ThemeContext.Provider>
        </TitleContext.Provider>
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
