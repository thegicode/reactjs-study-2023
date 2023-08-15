import { useState } from "react";
import Page from "./Page";

export default function UseConText1() {
    const [isDark, setIsDark] = useState<boolean>(false);
    return <Page isDark={isDark} setIsDark={setIsDark} />;
}
