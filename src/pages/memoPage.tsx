import Memo1 from "../contents/memo/memo1";
import Memo2 from "../contents/memo/memo2";
import Memo3 from "../contents/memo/memo3";
import Memo4 from "../contents/memo/Memo4";
import Memo5 from "../contents/memo/Memo5";
import Memo6 from "../contents/memo/Memo6";

import styles from "../css/MemoPage.module.css";

export default function memoPage() {
    return (
        <section className={styles.memoPage}>
            <h1>React Memo</h1>

            <p>
                <strong>prop이 변동되지 않으면 리렌더링을 하지 않는다.</strong>
            </p>

            <code className={styles.codeReference}>
                const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
            </code>

            <ul>
                <li>memo: memoization</li>
                <li>불필요한 렌더링을 하지 않는다.</li>
                <li>
                    리엑트는 부모 컴포넌트가 렌더링되면 자식 컴포넌트로 자동으로
                    렌더링된다.
                </li>
                <li>
                    react memo를 적용하면 자식 컴포넌트를 props가 변경될 때만
                    렌더링한다.
                </li>
                <li>
                    react memo를 적용하면 props가 변경되지 않으면 컴포넌트는
                    리렌더링을 하지 않고 기존에 렌더링된 것을 재사용한다.
                </li>
                <li>
                    렌더링된 결과를 어딘가에 저장하기 때문에 무분별하게 사용하면
                    안된다. 꼭 필요할때만!
                </li>
                <li>
                    useState, useReducer, useContext 와 같은 상태와 같은 hook을
                    사용하면 props와 상관없이 리렌더링된다.
                </li>
            </ul>

            <h2>간단한 예제 : memo </h2>
            <Memo1 />
            <p>
                - 부모 props가 변경될 때마다 자식 컴포턴트의 props가 변경이
                없어도 리렌더링이 된다.
            </p>
            <p>
                - React.memo를 사용하면 부모 props가 변경되더라도 자식
                컴포넌트의 prop이 변화가 없으면 리렌더링을 하지 않고 저장되었던
                것을 사용한다.
            </p>

            <h2>간단한 예제2: memo, useMemo</h2>
            <Memo2 />
            <p>- useMemo를 사용하여 Child는 리렌더링이 되지 않는다.</p>

            <h2>간단한 예제3: memo, useCallback</h2>
            <Memo3 />
            <p>- useCallback 사용하여 Child는 리렌더링이 되지 않는다.</p>

            <h2>Skipping re-rendering when props are unchanged</h2>
            <Memo4 />
            <p>
                - name이 변경되면 Greeting component는 리렌더링된다. <br />
                but memo를 적용하였으므로 address가 변경되면 Greeting
                component는 리렌더링되지 않는다.
            </p>

            <h2>Updating a memoized component using state</h2>
            <Memo5 />
            <p>
                - 컴포넌트의 state가 변경되면 컴포넌트가 memo 되었더라도
                리렌더링된다.
            </p>

            <h2>Updating a memoized component using a context </h2>
            <Memo6 />
            <p>
                memo를 적용했더라도 useContext를 사용하고 변경되었다면
                리렌더링된다.
            </p>

            <h2>Minimizing props changes</h2>
            <p>- memo를 최대한 활용하려면 props의 변경을 최소화</p>
            <p>
                - 예, prop이 object 이면, useMemo를 사용하여 object가 parent
                component가 매번 object를 re-create 하지 않도록 한다.
            </p>
            <p>
                - props가 변경되는 것을 최소화하기 위해, whole object 대신
                individual value를 props로 적용하라.
                <code>{"<Profile person={person} />"}</code> 대신
                <code>{"<Profile name={name} age={age} />"}</code>
            </p>
            <p>
                - 값 자체 보다는 값의 존재 여부
                <code>{"<CallToAction hasGroups={hasGroups} />"}</code>
            </p>

            <h2>
                arePropsEqual의 활용 :S pecifying a custom comparison function{" "}
            </h2>
        </section>
    );
}
