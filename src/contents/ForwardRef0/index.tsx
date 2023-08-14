import { useRef } from "react";

export default function ForwardRef0() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        inputRef.current?.focus();
    }

    return (
        <form className="forwardRef">
            <input type="text" ref={inputRef} />
            <button type="button" onClick={handleClick}>
                Edit
            </button>
        </form>
    );
}
