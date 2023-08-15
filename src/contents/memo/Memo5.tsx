import React, { memo, useState } from "react";

export default function Memo5() {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    return (
        <>
            <div style={{ display: "flex", gap: "10px" }}>
                <label>
                    Name{": "}
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Address{": "}
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
            </div>
            <Greeting name={name} />
        </>
    );
}

interface GreetingProps {
    name: string;
}

const Greeting: React.FC<GreetingProps> = memo(({ name }) => {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    const [greeting, setGreeting] = useState<string>("Hello");
    return (
        <>
            <h3>
                {greeting}
                {name && ", "}
                {name}!
            </h3>
            <GreetingSelector value={greeting} onChange={setGreeting} />
        </>
    );
});

interface GreetingSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const GreetingSelector: React.FC<GreetingSelectorProps> = ({
    value,
    onChange,
}) => {
    return (
        <>
            <label>
                <input
                    type="radio"
                    checked={value === "Hello"}
                    onChange={() => onChange("Hello")}
                />
                Regular greeting
            </label>
            <label>
                <input
                    type="radio"
                    checked={value === "Hello and welcome"}
                    onChange={() => onChange("Hello and welcome")}
                />
                Enthusiastic greeting
            </label>
        </>
    );
};
