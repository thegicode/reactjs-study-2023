import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface UserType {
    name: string;
}

interface CurrentUserContextType {
    currentUser: UserType | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const ThemeContext = createContext<Theme | null>(null);
const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export default function UseContext6() {
    const [theme, setTheme] = useState<Theme>("light");
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);

    return (
        <ThemeContext.Provider value={theme}>
            <CurrentUserContext.Provider
                value={{ currentUser, setCurrentUser }}
            >
                <WelcomePanel />
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
            </CurrentUserContext.Provider>
        </ThemeContext.Provider>
    );
}

function WelcomePanel() {
    const { currentUser } = useContext(
        CurrentUserContext
    ) as CurrentUserContextType;
    return (
        <Panel title="Welcome">
            {currentUser !== null ? <Greeting /> : <LoginForm />}
        </Panel>
    );
}

function Greeting() {
    const { currentUser } = useContext(
        CurrentUserContext
    ) as CurrentUserContextType;
    return <p>You logged in as {currentUser!.name}.</p>;
}

function LoginForm() {
    const { setCurrentUser } = useContext(
        CurrentUserContext
    ) as CurrentUserContextType;
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const canLogin = firstName !== "" && lastName !== "";

    return (
        <>
            <label>
                First name{": "}
                <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Last name{": "}
                <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <Button
                disabled={!canLogin}
                onClick={() => {
                    setCurrentUser({ name: firstName + " " + lastName });
                }}
            >
                Log in
            </Button>
            {!canLogin && <i>Fill in both fields.</i>}
        </>
    );
}

interface PanelProps {
    title: string;
    children: ReactNode;
}

function Panel({ title, children }: PanelProps) {
    const theme = useContext(ThemeContext) as string;
    const className = "panel-" + theme;
    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    );
}

interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

function Button({ children, disabled, onClick }: ButtonProps) {
    const theme = useContext(ThemeContext) as string;
    const className = "button-" + theme;
    return (
        <button className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}
