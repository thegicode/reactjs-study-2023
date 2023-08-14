import React, { createContext, memo, useContext, useState } from "react";

type Theme = "dark" | "light";
const ThemeContext = createContext<Theme | null>(null);

export default function MyApp() {
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
    return <h3 className={theme}>Hello, {name}!</h3>;
});
