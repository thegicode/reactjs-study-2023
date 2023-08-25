import { useState } from "react";

export default function UseConText1() {
    const [isDark, setIsDark] = useState<boolean>(false);
    return <Page isDark={isDark} setIsDark={setIsDark} />;
}

interface PageProps {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Page: React.FC<PageProps> = ({ isDark, setIsDark }) => {
    return (
        <div className="useContext1">
            <Header isDark={isDark} />
            <Content isDark={isDark} />
            <Footer isDark={isDark} setIsDark={setIsDark} />
        </div>
    );
};

interface HeaderProps {
    isDark: boolean;
}

const Header = ({ isDark }: HeaderProps) => {
    return (
        <header className={isDark ? "dark" : "noDark"}>
            <h1>Header</h1>
        </header>
    );
};

interface ContentProps {
    isDark: boolean;
}

const Content = ({ isDark }: ContentProps) => {
    return (
        <section className={"content " + (isDark ? "dark" : "noDark")}>
            <h1>Content</h1>
        </section>
    );
};

interface FooterProps {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer = ({ isDark, setIsDark }: FooterProps) => {
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
