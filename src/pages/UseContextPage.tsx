import "../css/useContextPage.css";
import UseConText0 from "../contents/useContext/useContext0/";
import UseConText1 from "../contents/useContext/useContext1/";
import UseConText2 from "../contents/useContext/useContext2/";
import UseConText3 from "../contents/useContext/UseContext3";

export default function useContextPage() {
    return (
        <section className="useContextPage">
            <h1>React CreateContext, UseContext</h1>
            <p>
                <strong>
                    전역적으로 사용되는 데이터를 하위 컴포넌트에 공유
                </strong>
            </p>

            <code className="code-reference">
                const value = useContext(SomeContext)
            </code>

            <ul>
                <li>Context를 사용하면 컴포넌트를 재사용하기 어렵다.</li>
                <li>
                    Prop Drilling을 피하기 위한 목적이라면{" "}
                    <strong style={{ textDecoration: "underline" }}>
                        Component Composition(컴포넌트 합성) - 찾아볼것!
                    </strong>
                </li>
            </ul>

            <h2>예제0 Context 적용전 : Prop Drilling</h2>
            <p>props로 자식에서 자식에게 전달</p>
            <UseConText0 />

            <h2>예제1 : createContext, useContext</h2>
            <p>object, {"value={{ isDark, setIsDark }}"}</p>
            <UseConText1 />

            <h2>예제2 </h2>
            <p>string, {"value={'예쁜 타이틀 컨텍스트'}"}</p>
            <UseConText2 />

            <h3>Passing data deeply into the tree </h3>
            <UseConText3 />
        </section>
    );
}
