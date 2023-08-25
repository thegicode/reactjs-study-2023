import { useCallback, useState } from "react";
import Child from "./Child";
import styles from "../../../css/Memo.module.css";

export default function Memo3() {
    console.log("부모 컴포넌트");
    const [amount, setAmount] = useState<number>(0);

    const increase = () => {
        setAmount(amount + 1);
    };

    /* 1. 문제 */
    // const passFn =
    //  () => {
    //     console.log("부모 메서드 실행");
    // };
    // passFn의 메모리 주소가 렌더링 될 때마다 변경된다. -> Child 리렌더링

    /* 2. 해결 */
    const passFn = useCallback(() => {
        console.log("부모 메서드 실행");
    }, []);
    // useCallback으로 passFn memoiztaion -> Child의 props가 변동이 없으므로 리렌더링되지 않는다.

    return (
        <section className={styles.memo1}>
            <h3>Parent Component</h3>
            <span>수량: {amount}</span>
            <button type="button" onClick={increase}>
                부모 수량 증가
            </button>

            <Child title="april" passFn={passFn} />
        </section>
    );
}
