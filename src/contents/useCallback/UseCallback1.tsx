import { useCallback, useEffect, useState } from "react";
import styles from "../../css/UseCallback.module.css";

export default function UseCallback1() {
    const [number, setNumber] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(true);

    const handleClick = useCallback(() => {
        console.log("handleClick", number);
        return;
    }, [number]);
    // number가 바뀔 때마다 handleClick을 다시 memoization

    useEffect(() => {
        console.log("handleClick이 변경되었습니다.");
    }, [handleClick]);

    return (
        <section className={styles.useCallback}>
            <input
                type="number"
                min="0"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />
            {/* <button type="button" onClick={() => setToggle(!toggle)}>
                {toggle.toString()}
            </button> */}

            <button type="button" onClick={handleClick}>
                click
            </button>

            <div>
                <input
                    type="checkbox"
                    checked={toggle}
                    onChange={() => setToggle(!toggle)}
                />
                {toggle.toString()}
            </div>
        </section>
    );
}
