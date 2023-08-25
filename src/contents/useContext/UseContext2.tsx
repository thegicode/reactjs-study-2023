import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { TitleContext } from "../../context/TitleContext";
import styles from "../../css/UseContext.module.css";

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
        <div className={styles.useContext1}>
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

    const className = isDark ? styles.themeDark : styles.themeNormal;

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

    const classNames = [styles.content];
    isDark
        ? classNames.push(styles.themeDark)
        : classNames.push(styles.themeNormal);

    return (
        <section className={classNames.join(" ")}>
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

    return (
        <footer className={isDark ? styles.themeDark : styles.themeNormal}>
            <h1>Footer</h1>
            <button onClick={toggle}>Dark Mode</button>
        </footer>
    );
};
