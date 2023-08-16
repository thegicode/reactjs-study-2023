import { ChangeEvent, useEffect, useState } from "react";

export default function UseEffect1() {
    const [count, setCount] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>("");

    const handleClick = () => {
        setCount(count + 1);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // 렌더링 될 때마다 매번 실행
    useEffect(() => {
        console.log("렌더링");
    });

    // 마운트, count 변화할 때만 실행
    useEffect(() => {
        console.log("count 변화");
    }, [count]);

    // 마운트 될 때만 실행
    useEffect(() => {
        console.log("Mount");
    }, []);

    return (
        <section className="useEffect1">
            <h3>count 증가 </h3>
            <button type="button" onClick={handleClick}>
                Update count
            </button>
            <span>count: {count}</span>

            <h3>텍스트 입력</h3>
            <input type="text" value={keyword} onChange={handleChange} />
            <span>keyword: {keyword}</span>
        </section>
    );
}
