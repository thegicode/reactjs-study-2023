import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<Theme | null>(null);

export default function UseContext3() {
    const [theme, setTheme] = useState<Theme>("light");
    return (
        <ThemeContext.Provider value={theme}>
            <Form />
            <label>
                <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={(e) => {
                        setTheme(e.target.checked ? "dark" : "light");
                    }}
                />
                Use dark mode
            </label>
        </ThemeContext.Provider>
    );
}

function Form() {
    return (
        <Panel title="Welcome">
            <Button>Sign up</Button>
            <Button>Log in</Button>
        </Panel>
    );
}

interface PanelProps {
    title: string;
    children: ReactNode;
}

function Panel({ title, children }: PanelProps) {
    const theme = useContext(ThemeContext);
    const className = "useContext4 panel-" + theme;
    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    );
}

interface ButtonProps {
    children: ReactNode;
}

function Button({ children }: ButtonProps) {
    const theme = useContext(ThemeContext);
    const className = "button-" + theme;
    return <button className={className}>{children}</button>;
}
