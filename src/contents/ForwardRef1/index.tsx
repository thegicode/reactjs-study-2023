import React, { useRef } from "react";
import MyInput from "./MyInput";

export default function ForwardRef() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        inputRef.current?.focus();
    }

    return (
        <form className="forwardRef">
            <MyInput label="Enter your name:" ref={inputRef} />
            <button type="button" onClick={handleClick}>
                Edit
            </button>
        </form>
    );
}
