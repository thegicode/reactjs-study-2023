import { useState } from "react";
import Child from "./Child";

import styles from "../../../css/Memo.module.css";

export default function App() {
    console.log("부모 컴포넌트");
    const [amount, setAmount] = useState<number>(0);
    const [amountChild, setAmountChild] = useState<number>(0);

    const increase = () => {
        setAmount(amount + 1);
    };
    const increaseChild = () => {
        setAmountChild(amountChild + 1);
    };

    return (
        <section className={styles.memo1}>
            <h3>Parent Component</h3>
            <span>수량: {amount}</span>
            <button type="button" onClick={increase}>
                부모 수량 증가
            </button>
            <button type="button" onClick={increaseChild}>
                자식 수량 증가
            </button>
            <Child title="april" amount={amountChild.toString()} />
        </section>
    );
}
