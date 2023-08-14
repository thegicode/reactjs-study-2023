import ForwardRef0 from "../contents/ForwardRef0";
import ForwardRef1 from "../contents/ForwardRef1";
import ForwardRef2 from "../contents/ForwardRef2";
import ForwardRef3 from "../contents/ForwardRef3";
import ForwardRef4 from "../contents/ForwardRef4";

import "../css/forwardRef.css";

function ForwardRefPage() {
    return (
        <div className="forwardRef">
            <h1>ForwardRef</h1>
            <p>자식의 ref를 부모에게 전달</p>
            <p>자식의 컴포턴트를 반복적으로 사용할 때</p>
            <p>컴포넌트의 캡슐화를 해칠 수 있다. </p>
            <p>필요할 때만 사용</p>

            <h2>0. ForwardRef 적용 전</h2>
            <ForwardRef0 />

            <h2>1. Focusing a text input</h2>
            <ForwardRef1 />

            <h2>2. Playing and pausing a video</h2>
            <ForwardRef2 />

            <h2>3. Forwarding a ref through multiple components </h2>
            <ForwardRef3 />

            <h2>4. Exposing an imperative handle instead of a DOM node </h2>
            <ForwardRef4 />
        </div>
    );
}

export default ForwardRefPage;
