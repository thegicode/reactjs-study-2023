interface HeaderProps {
    isDark: boolean;
}

const Header = ({ isDark }: HeaderProps) => {
    return (
        <header
            className={isDark ? "dark" : "noDark"}
            // style={{
            //     backgroundColor: isDark ? "black" : "white",
            //     color: isDark ? "white" : "black",
            // }}
        >
            <h1>Header</h1>
        </header>
    );
};

export default Header;
