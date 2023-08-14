import React, { useRef } from "react";
import MyInput from "./MyInput";

export default function Form() {
    const ref = useRef<HTMLInputElement>(null);

    function handleClick() {
        ref.current?.focus();
    }

    return (
        <form className="forwardRef">
            <MyInput label="Enter your name:" ref={ref} />
            <button type="button" onClick={handleClick}>
                Edit
            </button>
        </form>
    );
}
