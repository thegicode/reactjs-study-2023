import { useEffect, useMemo, useState } from "react";

export default function UseMemo2() {
    const [number, setNumber] = useState<number>(0);
    const [isCat, setIsCat] = useState<boolean>(true);

    // 1. animal이 원시타입 string 인 경우
    // const animal = isCat ? "cat" : "dog";

    // useEffect(() => {
    //     console.log("useEffect 호출");
    // }, [animal]);
    // useEffect는 처음에 호출이 되고 animal이 바뀌었을 때 호출된다.

    // 2. animal이 객체인 경우
    const animal = useMemo(() => {
        return {
            kind: isCat ? "cat" : "dog",
        };
    }, [isCat]);
    // 변수에 원시 타입을 할당하면 변수에 저장
    // 변수에 할당된 객체 타입은 렌더링 될 때마다 참조된 메모리 주소가 다르다.
    // 따라서 useMemo를 사용하여 참조 메모리 주소를 고정

    useEffect(() => {
        console.log("useEffect 호출");
        // 무거운 작업
    }, [animal]);

    return (
        <div className="useMemo2">
            <h3>원시 타입과 객체 비교</h3>

            <h4>숫자 입력</h4>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
            />

            <h4>동물</h4>
            <p>{animal.kind}</p>
            <button onClick={() => setIsCat(!isCat)}>고양이?</button>
        </div>
    );
}
