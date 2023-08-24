import "../css/addToCartPage.css";
import AddToCart1 from "../contents/addToCart/AddToCart1";
import AddToCart2 from "../contents/addToCart/AddToCart2";
import AddToCart3 from "../contents/addToCart/AddToCart3";
import AddToCart4 from "../contents/addToCart/AddToCart4";

export default function memoPage() {
    return (
        <section className="addToCartPage">
            <h1>AddToCart</h1>

            <h2>AddToCart 1 </h2>
            <h3>: Data useState + Modal forwardRef</h3>
            <AddToCart1 />

            <h2>AddToCart 2 *****</h2>
            <h3> : Data useReducer + Modal forwardRef</h3>
            <p>- Modal을 ref로, Data를 useReducer로 컨트롤</p>
            <p>- Data를 Reducer를 적용하면 한 눈에 보기 쉽다. </p>
            <p>- ActionButton의 리랜더링을 더 막을 수는 없을까?</p>
            <p>- App, ProductList의 리랜더링은 괜찮은가?</p>
            <p>- 이 방식이 가장 좋은 것 같다.</p>
            <AddToCart2 />

            <h2>AddToCart 3</h2>
            <h3>: Data useReducer + Modal forwardRef + Modal useReducer</h3>
            <p>- Modal의 상태관리를 useReducer로 적용</p>
            <p>
                - ModalAction, modalReducer를 통해 Modal의 동작이 한 눈에
                보인다.
            </p>
            <p>- 코드가 길어진다. </p>
            <p>- 굳이 useReducer로 적용해야 할까?</p>
            <AddToCart3 />

            <h2>AddToCart4 *****</h2>
            <h3>: Data useReducer + Modal useState</h3>
            <p>
                - Data는 useReducer를 사용하는 것이 코드를 한 눈에 보기가 좋다.
            </p>
            <p>
                - Modal을 forwardRef를 사용하지 않고 useState로 구현해도 괜찮은
                것 같다.
            </p>
            <AddToCart4 />

            {/* 

            <h2>Products 4 : useReducer</h2>
            <p>
                - 모달 열릴 때 Parent, 모든 Item이 리렌더링, memo 추가해야 한다.
            </p>
            <p>- 모달 열릴 때 App이 리렌더링</p>
            <Products4 />

            <h2>Products 5 : forwardRef + useReducer(Item 기준)</h2>
            <p>
                - useReducer를 추가한후 Item input value가 변경될 때마다,
                Modal이 닫힐 때마다 모든 Item이 리렌더링 된다.
            </p>
            <Products5 />

            <h2>Products 6 : forwardRef + useReducer(Modal 기준) *****</h2>
            <p>
                - Modal에 useReducer를 적용하니 이전 코드에 비해 코드가 눈에 더
                잘 들어오고 관리도 편한 것 같다.
            </p>
            <Products6 />

            <h2>
                Products 7 : useReducer(Modal 기준), Products 6 에서 forwardRef
                제거
            </h2>
            <p>- 모달이 변경될 때 App, Parent, 모든 Item이 리렌더링된다. </p>
            <Products7 />

            <h2>Products 8 : Products2 의 리렌더링 개선</h2>
            <p></p>
            <Products8 /> */}
        </section>
    );
}
