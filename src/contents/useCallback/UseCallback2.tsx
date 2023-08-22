import { useCallback, useEffect, useState } from "react";

export default function UseCallback2() {
    const [size, setSize] = useState<number>(100);
    const [isDark, setIsDark] = useState<boolean>(false);

    const createBoxStyle = useCallback(() => {
        return {
            backgroundColor: "green",
            width: `${size}px`,
            height: `${size}px`,
        };
    }, [size]);

    const themeClassName = isDark ? "theme-dark" : "";

    return (
        <section className={"useCallback " + themeClassName}>
            <input
                type="number"
                min="0"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
            />
            <Box createBoxStyle={createBoxStyle} />
            <div>
                <input type="checkbox" onChange={() => setIsDark(!isDark)} />
                {isDark.toString()}
            </div>
        </section>
    );
}

interface BoxStyleType {
    backgroundColor: string;
    width: string;
    height: string;
}

interface BoxProps {
    createBoxStyle: () => BoxStyleType;
}

function Box({ createBoxStyle }: BoxProps) {
    const [style, setStyle] = useState<BoxStyleType | null>(null);

    useEffect(() => {
        console.log("박스 키우기");
        setStyle(createBoxStyle());
    }, [createBoxStyle]);

    return <div style={style!}></div>;
}
