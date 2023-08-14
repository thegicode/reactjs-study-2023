import "../css/memoPage.css";
import MemoApp1 from "../contents/MemoApp1";
import MemoApp2 from "../contents/MemoApp2";

export default function memoPage() {
    return (
        <section className="memoPage">
            <h1>React Memo</h1>

            <code>
                const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
            </code>

            <ul>
                <li>불필요한 렌더링을 하지 않는 아이디어</li>
                <li>
                    리엑트는 부모 컴포넌트가 렌더링되면 자식 컴포넌트로 자동으로
                    렌더링된다.
                </li>
                <li>
                    react memo는 자식 컴포넌트를 꼭 필요할 때만(props가 변경될
                    때만) 렌더링
                </li>
                <li>
                    react memo는 props가 변경되지 않으면 컴포넌트는 리렌더링을
                    하지 않고 기존에 렌더링된 것을 재사용한다.
                </li>
                <li>
                    렌더링된 결과를 어딘가에 저장하기 때문에 너무 남발하면
                    안된다.
                </li>
            </ul>

            <h2>Skipping re-rendering when props are unchanged</h2>
            <MemoApp1 />
            <p>
                name이 변경되면 Greeting component는 리렌더링된다. <br />
                but address가 변경되면 Greeting component는 리렌더링되지 않는다.
            </p>

            <h2>Updating a memoized component using state</h2>
            <MemoApp2 />
            <p>
                컴포넌트의 state가 변경되면 컴포넌트가 memoized 되었더라도
                리렌더링된다.
            </p>
            <p>
                state를 현재 값으로 설정하면 리액트는 memo 없이도 컴포넌트를
                리렌더링되지 않는다.
            </p>

            <h2>Updating a memoized component using a context </h2>
        </section>
    );
}
