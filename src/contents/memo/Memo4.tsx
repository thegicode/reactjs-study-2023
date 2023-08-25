import React, { memo, useState, ChangeEvent, FC } from "react";
// import styles from "../../../css/Memo.module.css";

const Memo4: FC = () => {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    return (
        <>
            <div style={{ display: "flex", gap: "10px" }}>
                <label>
                    Name{": "}
                    <input value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Address{": "}
                    <input value={address} onChange={handleAddressChange} />
                </label>
            </div>
            <Greeting name={name} />
        </>
    );
};

interface GreetingProps {
    name: string;
}

const Greeting: FC<GreetingProps> = memo(({ name }) => {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return (
        <h3>
            Hello{name && ", "}
            {name}!
        </h3>
    );
});

export default Memo4;
