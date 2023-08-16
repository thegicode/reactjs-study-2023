import "../css/useMemoPage.css";
import UseMemo1 from "../contents/useMemo/UseMemo1";

function UseMemoPage() {
    return (
        <section className="useMemoPage">
            <h1>useMemo Page</h1>

            <p>
                <strong>
                    자주 사용하는 값을 캐시해놓고 사용 <br />
                </strong>
            </p>

            <code className="code-reference">
                const cachedValue = useMemo(calculateValue, dependencies)
            </code>
            <ul>
                <li>
                    렌더링 {"->"} component 함수 호출, useMemo를 통해
                    memoization {"->"} 렌더링 {"->"} component 함수 호출,
                    memoized 된 값 재사용
                </li>
                <li>
                    dependencies 의존성 배열: 배열 안 요소의 값이 업데이트 될 때
                    다시 Memoization
                </li>
                <li>
                    의존성 배열이 빈 배열인 경우 맨처음 Memoization, 이후에는
                    항상 Memoized된 값을 사용
                </li>
                <li>
                    Memoization 한다는 것은 따로 메모리에 저장하는 것이므로
                    무분별하게 남발하면 안된다. 꼭 필요할때만.
                </li>
            </ul>

            <h2>예제 1</h2>
            <UseMemo1 />
        </section>
    );
}

export default UseMemoPage;
