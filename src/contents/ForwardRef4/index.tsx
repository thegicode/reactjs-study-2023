import React, { useRef } from "react";
import MyInput from "./MyInput";

interface MyInputInstance {
    focus: () => void;
    scrollIntoView: () => void;
}

export default function Form() {
    const ref = useRef<MyInputInstance | null>(null);

    function handleClick() {
        ref.current?.focus();
        // This won't work because the DOM node isn't exposed:
        // ref.current.style.opacity = 0.5;
    }

    return (
        <form>
            <MyInput label="Enter your name:" ref={ref} />
            <button type="button" onClick={handleClick}>
                Edit
            </button>
        </form>
    );
}
