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

export default Content;
