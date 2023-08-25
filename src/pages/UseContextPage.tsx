import "../css/useContextPage.css";
import UseConText0 from "../contents/useContext/UseContext0";
import UseConText1 from "../contents/useContext/UseContext1";
import UseConText2 from "../contents/useContext/UseContext2";
import UseConText3 from "../contents/useContext/UseContext3";
import UseConText4 from "../contents/useContext/UseContext4";

export default function useContextPage() {
    return (
        <section className="useContextPage">
            <h1>CreateContext, UseContext</h1>
            <p>
                <strong>
                    전역적으로 사용되는 데이터를 하위 컴포넌트에 공유
                </strong>
            </p>

            <code className="code-reference">
                const value = useContext(SomeContext)
            </code>

            <ul>
                <li>props로 전달하지 않아 간결하다.</li>
                <li>Context를 사용하면 컴포넌트를 재사용하기 어렵다.</li>
                <li>
                    Prop Drilling을 피하기 위한 목적이라면
                    <strong style={{ textDecoration: "underline" }}>
                        Component Composition(컴포넌트 합성) - 찾아볼것!
                    </strong>
                </li>
            </ul>

            <h2>0. Context 적용전 : Prop Drilling</h2>
            <p>props로 자식에서 자식에게 전달</p>
            <UseConText0 />

            <h2>1. createContext, useContext</h2>
            <ul>
                <li>
                    루트에서 createContext 후 Provider로 자식을 감싸주면 원하는
                    자식 컴포넌트에서 useContext로 가져와서 적용한다.
                </li>
            </ul>

            <UseConText1 />

            <h2>2. </h2>
            <p>string, {"value={'예쁜 타이틀 컨텍스트'}"}</p>
            <UseConText2 />

            <h2>3. Updating a value via context </h2>
            <UseConText3 />

            <h2>4. Updating an object via context</h2>
            <UseConText4 />
        </section>
    );
}
