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

export default Footer;
