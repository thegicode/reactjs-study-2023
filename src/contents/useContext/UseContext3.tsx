import { createContext, useContext, ReactNode } from "react";

const ThemeContext = createContext<string | null>(null);

export default function UseContext3() {
    return (
        <ThemeContext.Provider value="dark">
            <Form />
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
    const className = "userContext3 panel-" + theme;
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
