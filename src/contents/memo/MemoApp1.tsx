import React, { memo, useState, ChangeEvent, FC } from "react";

const MemoApp1: FC = () => {
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
            <label>
                Name{": "}
                <input value={name} onChange={handleNameChange} />
            </label>
            <label>
                Address{": "}
                <input value={address} onChange={handleAddressChange} />
            </label>
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

export default MemoApp1;
