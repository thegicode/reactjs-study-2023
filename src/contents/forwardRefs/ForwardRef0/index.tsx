import { useRef } from "react";
import styles from "../../../css/ForwardRef.module.css";

export default function ForwardRef0() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        inputRef.current?.focus();
    }

    return (
        <form className={styles.forwardRef}>
            <input type="text" ref={inputRef} />

            <button type="button" onClick={handleClick}>
                Edit
            </button>
        </form>
    );
}
