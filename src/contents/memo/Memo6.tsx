import React, { createContext, memo, useContext, useState } from "react";
import styles from "../../css/Memo.module.css";

type Theme = "dark" | "light";
const ThemeContext = createContext<Theme | null>(null);

export default function Memo6() {
    const [theme, setTheme] = useState<Theme>("dark");

    function handleClick() {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }

    return (
        <ThemeContext.Provider value={theme}>
            <button onClick={handleClick}>Switch theme</button>
            <Greeting name="Taylor" />
        </ThemeContext.Provider>
    );
}

interface GreetingProps {
    name: string;
}

const Greeting: React.FC<GreetingProps> = memo(({ name }) => {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error("Theme context is not set!");
    }

    const className = styles[theme];
    return <h3 className={className}>Hello, {name}!</h3>;
});
