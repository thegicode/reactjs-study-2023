import { useState, useMemo } from "react";
import Child from "./Child";

export default function App() {
    console.log("부모 컴포넌트");
    const [amount, setAmount] = useState<number>(0);

    const increase = () => {
        setAmount(amount + 1);
    };

    /* 1. 문제 발생: Child 리렌더링 */
    // const data = {
    //     a: "a",
    //     b: "b",
    // };
    // Object data의 렌더링 될 때마다 다른 메모리 주소에 저장된다.
    // 따라서 Child의 memo는 변화가 있는 것으로 인식하여 리렌더링된다.

    /* 2. useMemo로 해결 */
    const data = useMemo(() => {
        return {
            a: "a",
            b: "b",
        };
    }, []);
    // useMemo로 memoization 하여 참조 주소가 변경되지 않는다.
    // memoized so the reference won't change between renders
    // Child props가 변경되지 않으므로 리렌더링 되지 않는다.

    return (
        <section className="memo1">
            <h3>Parent Component</h3>
            <span>수량: {amount}</span>
            <button type="button" onClick={increase}>
                부모 수량 증가
            </button>

            <Child data={data} />
        </section>
    );
}
