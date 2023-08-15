import "../css/forwardRef.css";

import ForwardRef0 from "../contents/forwardRefs/ForwardRef0";
import ForwardRef1 from "../contents/forwardRefs/ForwardRef1";
import ForwardRef2 from "../contents/forwardRefs/ForwardRef2";
import ForwardRef3 from "../contents/forwardRefs/ForwardRef3";
import ForwardRef4 from "../contents/forwardRefs/ForwardRef4";

function ForwardRefPage() {
    return (
        <section className="forwardRef">
            <h1>React ForwardRef</h1>

            <p>
                <strong>부모 컴포넌트에서 자녀 컴포넌트로 ref를 전달</strong>
            </p>

            <code className="code-reference">
                const SomeComponent = forwardRef(render)
            </code>
            <ul>
                <li>두 번째 인자에 ref 전달</li>
                <li>재사용성이 높은 자녀 컴포턴트</li>
                <li>컴포넌트의 캡슐화의 장점을 없앨 수 있다. </li>
                <li>필요할 때만 사용편이 좋다.</li>
            </ul>

            <h2>0. ForwardRef 적용 전</h2>
            <ForwardRef0 />

            <h2>1. input 엘리먼트 focusing</h2>
            <ForwardRef1 />

            <h2>2. 비디오 재생 & 일시정지</h2>
            <ForwardRef2 />

            <h2>3. 여러 컴포넌트를 통해 ref 전달</h2>
            <ForwardRef3 />

            <h2>4. useImperativeHandle 사용</h2>
            <p>
                부모 컴포넌트가 자식 컴포넌트의 특정 메서드나 값을 직접 액세스
            </p>
            <p>focus()가 자식 컴포넌트에</p>
            <ForwardRef4 />
        </section>
    );
}

export default ForwardRefPage;
