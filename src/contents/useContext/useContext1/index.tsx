import { useState } from "react";
import Page from "./Page";
import { ThemeContext } from "../../context/ThemeContext";

export default function UseConText1() {
    const [isDark, setIsDark] = useState<boolean>(false);
    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            <Page />
        </ThemeContext.Provider>
    );
}
