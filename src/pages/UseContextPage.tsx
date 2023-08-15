import "../css/useContextPage.css";
import UseConText0 from "../contents/useContext/useContext0/index";
import UseConText1 from "../contents/useContext/useContext1/index";

export default function useContextPage() {
    return (
        <section className="useContextPage">
            <h1>React CreateContext, UseContext</h1>
            <p>
                <strong>
                    전역적으로 사용되는 데이터를 하위 컴포넌트에 공유
                </strong>
            </p>

            <code className="code-reference"></code>

            <h2>예제0 Context 적용전 : Prop Drilling</h2>
            <p>props로 자식에서 자식에게 전달</p>
            <UseConText0 />

            <h2>예제1 : createContext, userContext</h2>
            <UseConText1 />
            <p>Page component 코드가 깔끔해짐</p>
        </section>
    );
}
