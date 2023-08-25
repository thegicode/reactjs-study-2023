import "../css/addToCartPage.css";
import AddToCart1 from "../contents/addToCart/AddToCart1";
import AddToCart2 from "../contents/addToCart/AddToCart2";
import AddToCart3 from "../contents/addToCart/AddToCart3";
import AddToCart4 from "../contents/addToCart/AddToCart4";
import AddToCart5 from "../contents/addToCart/AddToCart5";

export default function memoPage() {
    return (
        <section className="addToCartPage">
            <h1>AddToCart</h1>

            <h2>AddToCart 1 </h2>
            <h3>: Data useState + Modal forwardRef</h3>
            <ul>
                <li>state를 루트에서 관리</li>
                <li>관련 메서드들도 루트에 작성, 한 눈에 파악이 어렵다.</li>
            </ul>

            <AddToCart1 />

            <h2>AddToCart 2 *****</h2>
            <h3> : Data useReducer + Modal forwardRef</h3>
            <ul>
                <li>Modal을 ref로, Data를 useReducer로 컨트롤</li>
                <li>Data를 Reducer를 적용하면 한 눈에 보기 쉽다. </li>
                <li>ActionButton의 리랜더링을 더 막을 수는 없을까?</li>
                <li>App, ProductList의 리랜더링은 괜찮은가?</li>
                <li>이 방식이 가장 좋은 것 같다.</li>
            </ul>

            <AddToCart2 />
            <h2>AddToCart 3</h2>
            <h3>: Data useReducer + Modal forwardRef + Modal useReducer</h3>
            <ul>
                <li>Modal의 상태관리를 useReducer로 적용</li>
                <li>
                    ModalAction, modalReducer를 통해 Modal의 동작이 한 눈에
                    보인다.
                </li>
                <li>코드가 길어진다. </li>
                <li>굳이 useReducer로 적용해야 할까?</li>
            </ul>

            <AddToCart3 />

            <h2>AddToCart 4 ***</h2>
            <h3>: Data useReducer + Modal useState</h3>
            <ul>
                <li>
                    Data는 useReducer를 사용하는 것이 코드를 한 눈에 보기가
                    좋다.
                </li>
                <li>
                    Modal을 forwardRef를 사용하지 않고 useState로 구현해도
                    괜찮은 것 같다.
                </li>
                <li>
                    ModalState, setModalState, handleOpenModal 구현이 루트에
                    있어야 한다.
                </li>
                <li>
                    ModalState, setModalState을 Modal에 Prop로 전달해야 한다.
                </li>
            </ul>

            <AddToCart4 />

            <h2>AddToCart 5 : not recommend</h2>
            <h3>: Data useContext + Modal forwardRef</h3>
            <ul>
                <li>모든 컴포넌트들이 리렌더링되고 memo를 적용해도 리랜더링</li>
                <li>
                    Separate Contexts: 현재 DataContext에서는 모든 아이템
                    데이터와 setData 함수를 함께 제공하고 있다. 이렇게 되면,
                    하나의 아이템만 변경되어도 모든 아이템에 대한 리렌더링이
                    발생할 수 있다. data와 setData를 분리된 context로 관리하면
                    이러한 문제를 줄일 수 있다.
                </li>
                <li>
                    props 전달을 줄이는 것은 코드의 가독성과 유지 보수성을 위한
                    것이며, 실제 성능 향상을 위해서는 다른 최적화 기법들도 함께
                    고려해야 한다.
                </li>
            </ul>
            <AddToCart5 />

            <h2>AddToCart 6 : </h2>
            <h3> : Data useReducer + Modal forwardRef + useContext</h3>
            <ul>
                <li>dispatch를 Context로 적용</li>
                <li>역시나 모든 컴포넌트가 리렌더링</li>
            </ul>
            <AddToCart5 />
        </section>
    );
}
