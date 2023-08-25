import { ChangeEvent, useState } from "react";

type UseInputReturnType = [
    string,
    (e: ChangeEvent<HTMLInputElement>) => void,
    () => void
];

function displayMessage(message: string) {
    console.log(message);
}

export default function CustomHook1() {
    const [inputValue, handleChange, handleSubmit]: UseInputReturnType =
        useInput("", displayMessage);

    return (
        <section>
            <h2>useInput</h2>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button onClick={handleSubmit}>확인</button>
        </section>
    );
}

function useInput(
    initialValue: string,
    submitAction: (message: string) => void
): UseInputReturnType {
    const [inputValue, setInputValue] = useState<string>(initialValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        setInputValue("");
        submitAction(inputValue);
    };

    return [inputValue, handleChange, handleSubmit];
}
