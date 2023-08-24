import { useState } from "react";
import Page from "./Page";
import { ThemeContext } from "../../context/ThemeContext";
import { TitleContext } from "../../context/TitleContext";

export default function UseConText1() {
    const [isDark, setIsDark] = useState<boolean>(false);
    return (
        <TitleContext.Provider value="예쁜 타이틀 컨텍스트">
            <ThemeContext.Provider value={{ isDark, setIsDark }}>
                <Page />
            </ThemeContext.Provider>
        </TitleContext.Provider>
    );
}
