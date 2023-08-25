import { createContext, ReactNode, useContext, useState } from "react";
import styles from "../../css/UseContext.module.css";

interface CurrentUserType {
    name: string;
}
interface CurrentUserContextType {
    currentUser: CurrentUserType | null;
    setCurrentUser: React.Dispatch<
        React.SetStateAction<CurrentUserType | null>
    >;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export default function UseContext4() {
    const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(
        null
    );

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Panel title="Welcome">
                <LoginButton />
            </Panel>
        </CurrentUserContext.Provider>
    );
}

interface PanelProps {
    title: string;
    children: ReactNode;
}
function Panel({ title, children }: PanelProps) {
    return (
        <section className={styles.panel}>
            <h3>{title}</h3>
            {children}
        </section>
    );
}

function LoginButton() {
    const contextValue = useContext(CurrentUserContext);
    if (contextValue === null) {
        throw new Error("CurrentUserContext not provided");
    }

    const { currentUser, setCurrentUser } = contextValue;
    if (currentUser !== null) {
        return <p>You logged in as {currentUser.name}.</p>;
    }

    return (
        <Button
            onClick={() => {
                setCurrentUser({ name: "Advika" });
            }}
        >
            Log in as Advika
        </Button>
    );
}

interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}
