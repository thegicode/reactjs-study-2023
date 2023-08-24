import { useEffect, useState } from "react";
import styles from "../../css/UseEffect1.module.css";

export default function UseEffect2() {
    const [showTimer, setShowTimer] = useState<boolean>(false);

    return (
        <section className={styles.useEffect1}>
            {showTimer && <Timer />}
            <button type="button" onClick={() => setShowTimer(!showTimer)}>
                Toggle Timer
            </button>
        </section>
    );
}

function Timer() {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("timer ing...");
        }, 1000);

        // cleanup
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <p>
            <span>타이머 시작, 콘솔 확인</span>
        </p>
    );
}
