import { useMemo, useState } from "react";
import styles from "../../css/UseMemo.module.css";

const calculate = (amount: number) => {
    console.log("calculate");
    return amount * 100;
};

const delayCalculate = (amount: number) => {
    console.log("delayCalculate");
    for (let i = 0; i < 100; i++) {}
    return amount * 1000;
};

export default function UseMemo1() {
    const [amount, setAmount] = useState<number>(0);
    const [delayAmount, setDelayAmount] = useState<number>(0);

    const price = calculate(amount);

    // const delayPrice = delayCalculate(delayAmount);
    const delayPrice = useMemo(() => {
        return delayCalculate(delayAmount);
    }, [delayAmount]);
    // delayAmount가 변경될 때만 다시 memoizaton

    return (
        <div className={styles.useMemo1}>
            <h3>가격 계산</h3>
            <input
                type="number"
                value={amount}
                min="0"
                onChange={(e) => setAmount(parseInt(e.target.value))}
            />
            <p>가격(단가 100) : {price}</p>

            <h3>delay 가격 계산 : useMemo</h3>
            <input
                type="number"
                value={delayAmount}
                min="0"
                onChange={(e) => setDelayAmount(parseInt(e.target.value))}
            />
            <p>가격(단가 1,000) : {delayPrice}</p>
        </div>
    );
}
